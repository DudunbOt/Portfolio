export interface Project {
  id: number
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
  startDate?: string
  endDate?: string
}

export interface Experience {
  id: number
  company: string
  role: string
  period: string
  description: string
  isCurrent: boolean
  technologies?: string[]
}

export interface Skill {
  id: number
  name: string
  proficiency?: number
}

export interface SkillCategory {
  id: number
  name: string
  code: string
  skills: Skill[]
}

export interface Contact {
  id: number
  name: string
  value: string
  icon: string
}

export interface Education {
  id: number
  institution: string
  degree: string
  fieldOfStudy: string
  period: string
  startDate?: string
  endDate?: string
}

export interface Profile {
  id: number
  name: string
  title: string
  bio: string
  email: string
  phoneNumber?: string
  location?: string
  avatar?: string
  resumeUrl?: string
  contacts: Contact[]
}

export interface Portfolio {
  profile: Profile
  projects: Project[]
  experience: Experience[]
  education: Education[]
  skillCategories: SkillCategory[]
}

// Legacy type for backwards compatibility
export interface SocialLink {
  name: string
  url: string
  icon: 'github' | 'linkedin' | 'mail' | 'twitter'
}
