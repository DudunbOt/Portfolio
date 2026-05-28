// API types mirroring backend DTOs

export interface PortfolioDTO {
  profile: ProfileDTO
  contacts: ContactPersonDTO[]
  projects: ProjectDTO[]
  experience: ExperienceDTO[]
  education: EducationDTO[]
  skills: SkillCategoryGroupDTO[]
}

export interface ProfileDTO {
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

export interface ContactPersonDTO {
  id: number
  name: string | null
  value: string | null
  icon: string | null
}

export interface ProjectDTO {
  id: number
  name: string | null
  description: string | null
  techStacks: string[]
  imageUrl: string | null
  projectUrl: string | null
  startDate: string | null
  endDate: string | null
}

export interface ExperienceDTO {
  id: number
  company: string | null
  position: string | null
  description: string | null
  startDate: string | null
  endDate: string | null
  isCurrent: boolean
}

export interface EducationDTO {
  id: number
  institution: string | null
  degree: string | null
  fieldOfStudy: string | null
  startDate: string | null
  endDate: string | null
}

export interface SkillDTO {
  id: number
  name: string | null
  proficiency: number | null
}

export interface SkillCategoryGroupDTO {
  categoryId: number
  categoryName: string | null
  categoryCode: string | null
  skills: SkillDTO[]
}
