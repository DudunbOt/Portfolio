import portfolioData from "./data/portfolio.json"

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
  skills: {
    categoryId: number
    categoryName: string | null
    categoryCode: string | null
    skills: {
      id: number
      name: string | null
      proficiency: number | null
    }[]
  }[]
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
  async fetch(request: Request): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    const url = new URL(request.url)

    // Route: /api/portfolio
    if (url.pathname === "/api/portfolio") {
      return jsonResponse(portfolioData as PortfolioDTO, 200, { "Cache-Control": "public, max-age=300" })
    }

    return jsonResponse({ message: "Not Found" }, 404)
  }
}
