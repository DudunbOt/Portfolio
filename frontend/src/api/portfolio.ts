import { apiClient } from './client'
import type { PortfolioDTO } from './types'
import type { Portfolio, Profile, Project, Experience, SkillCategory, Education } from '@/types'

// Fetch raw portfolio data from API
export async function fetchPortfolio(): Promise<PortfolioDTO> {
  return apiClient<PortfolioDTO>('/portfolio')
}

// Transform API response to UI-friendly format
export function transformPortfolio(dto: PortfolioDTO): Portfolio {
  return {
    profile: transformProfile(dto),
    projects: dto.projects.map(transformProject),
    experience: dto.experience.map(transformExperience),
    education: dto.education.map(transformEducation),
    skillCategories: dto.skills.map(transformSkillCategory),
  }
}

function transformProfile(dto: PortfolioDTO): Profile {
  return {
    id: dto.profile.id,
    name: dto.profile.name ?? '',
    title: dto.profile.title ?? '',
    bio: dto.profile.summary ?? '',
    email: dto.profile.email ?? '',
    phoneNumber: dto.profile.phoneNumber ?? undefined,
    location: dto.profile.location ?? undefined,
    avatar: dto.profile.imageUrl ?? undefined,
    resumeUrl: dto.profile.resumeUrl ?? undefined,
    contacts: dto.contacts.map((c) => ({
      id: c.id,
      name: c.name ?? '',
      value: c.value ?? '',
      icon: c.icon ?? '',
    })),
  }
}

function transformProject(dto: PortfolioDTO['projects'][0]): Project {
  return {
    id: dto.id,
    title: dto.name ?? '',
    description: dto.description ?? '',
    image: dto.imageUrl ?? undefined,
    technologies: dto.techStacks ?? [],
    liveUrl: dto.projectUrl ?? undefined,
    startDate: dto.startDate ?? undefined,
    endDate: dto.endDate ?? undefined,
  }
}

function transformExperience(dto: PortfolioDTO['experience'][0]): Experience {
  return {
    id: dto.id,
    company: dto.company ?? '',
    role: dto.position ?? '',
    period: formatDateRange(dto.startDate, dto.endDate),
    description: dto.description ?? '',
    isCurrent: dto.isCurrent,
  }
}

function transformEducation(dto: PortfolioDTO['education'][0]): Education {
  return {
    id: dto.id,
    institution: dto.institution ?? '',
    degree: dto.degree ?? '',
    fieldOfStudy: dto.fieldOfStudy ?? '',
    period: formatDateRange(dto.startDate, dto.endDate),
    startDate: dto.startDate ?? undefined,
    endDate: dto.endDate ?? undefined,
  }
}

function transformSkillCategory(dto: PortfolioDTO['skills'][0]): SkillCategory {
  return {
    id: dto.categoryId,
    name: dto.categoryName ?? '',
    code: dto.categoryCode ?? '',
    skills: dto.skills.map((s) => ({
      id: s.id,
      name: s.name ?? '',
      proficiency: s.proficiency ?? undefined,
    })),
  }
}

function formatDateRange(start: string | null, end: string | null): string {
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return 'Present'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  if (!start) return ''
  return `${formatDate(start)} - ${formatDate(end)}`
}
