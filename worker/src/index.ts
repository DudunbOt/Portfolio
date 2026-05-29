import { createClient, SupabaseClient } from "@supabase/supabase-js"

interface Env {
  SUPABASE_URL: string
  SUPABASE_PUBLISHABLE_KEY: string
}

interface Profile {
  Id: number
  Name: string | null
  Title: string | null
  Summary: string | null
  ImageUrl: string | null
  ResumeUrl: string | null
  Email: string | null
  PhoneNumber: string | null
  Location: string | null
}

interface ContactPerson {
  Id: number
  Name: string | null
  Value: string | null
  Icon: string | null
}

interface Project {
  Id: number
  Name: string | null
  Description: string | null
  TechStacks: string | null
  ImageUrl: string | null
  ProjectUrl: string | null
  StartDate: string | null
  EndDate: string | null
}

interface Experience {
  Id: number
  Company: string | null
  Position: string | null
  Description: string | null
  StartDate: string | null
  EndDate: string | null
}

interface Education {
  Id: number
  Institution: string | null
  Degree: string | null
  FieldOfStudy: string | null
  StartDate: string | null
  EndDate: string | null
}

interface Skill {
  Id: number
  Name: string | null
  Proficiency: number | null
  CategoryId: number | null
  Category: {
    Id: number
    Name: string | null
    Code: string | null
  } | null
}

interface SkillCategoryGroup {
  categoryId: number
  categoryName: string | null
  categoryCode: string | null
  skills: {
    id: number
    name: string | null
    proficiency: number | null
  }[]
}

interface PortfolioDTO {
  profile: {
    id: number
    name: string | null
    title: string | null
    summary: string | null
    imageUrl: string | null
    resumeUrl: string | null
    email: string | null
    phoneNumber: string | null
    location: string | null
  }
  contacts: {
    id: number
    name: string | null
    value: string | null
    icon: string | null
  }[]
  projects: {
    id: number
    name: string | null
    description: string | null
    techStacks: string[]
    imageUrl: string | null
    projectUrl: string | null
    startDate: string | null
    endDate: string | null
  }[]
  experience: {
    id: number
    company: string | null
    position: string | null
    description: string | null
    startDate: string | null
    endDate: string | null
    isCurrent: boolean
  }[]
  education: {
    id: number
    institution: string | null
    degree: string | null
    fieldOfStudy: string | null
    startDate: string | null
    endDate: string | null
  }[]
  skills: SkillCategoryGroup[]
}

async function getPortfolio(supabase: SupabaseClient): Promise<PortfolioDTO | null> {
  // Fetch profile (first non-deleted)
  const { data: profile, error: profileError } = await supabase
    .from("Profiles")
    .select("*")
    .is("DeletedDate", null)
    .limit(1)
    .single()

  if (profileError || !profile) {
    return null
  }

  // Fetch related data in parallel
  const [contactsResult, projectsResult, experiencesResult, educationsResult, skillsResult] = await Promise.all([
    supabase
      .from("ContactPersons")
      .select("*")
      .eq("ProfileId", profile.Id)
      .is("DeletedDate", null),
    supabase
      .from("Projects")
      .select("*")
      .eq("ProfileId", profile.Id)
      .is("DeletedDate", null)
      .order("StartDate", { ascending: false })
      .order("EndDate", { ascending: false }),
    supabase
      .from("Experiences")
      .select("*")
      .eq("ProfileId", profile.Id)
      .is("DeletedDate", null)
      .order("EndDate", { ascending: false, nullsFirst: true })
      .order("StartDate", { ascending: false }),
    supabase
      .from("Educations")
      .select("*")
      .eq("ProfileId", profile.Id)
      .is("DeletedDate", null)
      .order("EndDate", { ascending: false })
      .order("StartDate", { ascending: false }),
    supabase
      .from("Skills")
      .select("*, Category:SkillCategories(*)")
      .eq("ProfileId", profile.Id)
      .is("DeletedDate", null)
  ])

  const contacts = (contactsResult.data || []) as ContactPerson[]
  const projects = (projectsResult.data || []) as Project[]
  const experiences = (experiencesResult.data || []) as Experience[]
  const educations = (educationsResult.data || []) as Education[]
  const skills = (skillsResult.data || []) as Skill[]

  // Group skills by category
  const skillGroups = groupSkillsByCategory(skills)

  return {
    profile: {
      id: profile.Id,
      name: profile.Name,
      title: profile.Title,
      summary: profile.Summary,
      imageUrl: profile.ImageUrl,
      resumeUrl: profile.ResumeUrl,
      email: profile.Email,
      phoneNumber: profile.PhoneNumber,
      location: profile.Location
    },
    contacts: contacts.map(c => ({
      id: c.Id,
      name: c.Name,
      value: c.Value,
      icon: c.Icon
    })),
    projects: projects.map(p => ({
      id: p.Id,
      name: p.Name,
      description: p.Description,
      techStacks: p.TechStacks ? p.TechStacks.split(",").map((t: string) => t.trim()) : [],
      imageUrl: p.ImageUrl,
      projectUrl: p.ProjectUrl,
      startDate: p.StartDate,
      endDate: p.EndDate
    })),
    experience: experiences.map(e => ({
      id: e.Id,
      company: e.Company,
      position: e.Position,
      description: e.Description,
      startDate: e.StartDate,
      endDate: e.EndDate,
      isCurrent: e.EndDate === null
    })),
    education: educations.map(e => ({
      id: e.Id,
      institution: e.Institution,
      degree: e.Degree,
      fieldOfStudy: e.FieldOfStudy,
      startDate: e.StartDate,
      endDate: e.EndDate
    })),
    skills: skillGroups
  }
}

function groupSkillsByCategory(skills: Skill[]): SkillCategoryGroup[] {
  const grouped = new Map<number, SkillCategoryGroup>()

  for (const skill of skills) {
    const categoryId = skill.CategoryId || 0
    const categoryName = skill.Category?.Name || null
    const categoryCode = skill.Category?.Code || null

    if (!grouped.has(categoryId)) {
      grouped.set(categoryId, {
        categoryId,
        categoryName,
        categoryCode,
        skills: []
      })
    }

    grouped.get(categoryId)!.skills.push({
      id: skill.Id,
      name: skill.Name,
      proficiency: skill.Proficiency
    })
  }

  // Sort skills within each category by proficiency descending
  for (const group of grouped.values()) {
    group.skills.sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0))
  }

  // Sort categories by name
  return Array.from(grouped.values()).sort((a, b) =>
    (a.categoryName || "").localeCompare(b.categoryName || "")
  )
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function jsonResponse(data: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return Response.json(data, {
    status,
    headers: { ...corsHeaders, ...extraHeaders }
  })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    const url = new URL(request.url)

    // Route: /api/portfolio
    if (url.pathname === "/api/portfolio") {
      const supabase = createClient(
        env.SUPABASE_URL,
        env.SUPABASE_PUBLISHABLE_KEY
      )

      const portfolio = await getPortfolio(supabase)

      if (!portfolio) {
        return jsonResponse({ message: "Portfolio not found" }, 404)
      }

      return jsonResponse(portfolio, 200, { "Cache-Control": "public, max-age=300" })
    }

    return jsonResponse({ message: "Not Found" }, 404)
  }
}
