export interface PersonalInfo {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  city: string
  state: string
  country?: string
  linkedin?: string
  github?: string
  website?: string
  summary: string
}

export interface Experience {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  achievements: string[]
}

export interface Skill {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  category: string
}

export interface Project {
  name: string
  description: string
  startDate: string
  endDate: string
  url?: string
  technologies: string[]
  achievements: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  targetRole?: string
  targetCompany?: string
}

export interface LayoutSettings {
  template: string
  color: string
  font: string
  fontSize: string
  margins: {
    top: number
    right: number
    bottom: number
    left: number
  }
  lineSpacing: string
  pageSize: "a4" | "letter" | "legal"
  sections: {
    id: string
    name: string
    page: number
    visible: boolean
  }[]
  pages: number
}

export interface ExportSettings {
  format: "pdf" | "docx" | "tex"
  quality: "draft" | "standard" | "high"
  includeLinks: boolean
}

export interface AISettings {
  model: string
  tailoring: boolean
  suggestions: boolean
}

export interface ResumeSettings {
  layout: LayoutSettings
  export: ExportSettings
  ai: AISettings
}

export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  tags: string[]
}
