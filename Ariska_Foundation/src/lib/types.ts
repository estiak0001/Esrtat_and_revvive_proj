export const defaultCompany: Company = {
  name: 'ARISKA',
  tagline: 'Creating Connections, Building Success',
  founded: '2024',
  experience: '15+',
  phone: '',
  website: '',
  registeredAddress: '',
  businessAddress: '',
  mission_heading: '',
  mission_intro: '',
  vision_heading: '',
  vision_intro: '',
  vision_sub: '',
}

export type Company = {
  name: string
  tagline: string
  founded: string
  experience: string
  phone: string
  website: string
  registeredAddress: string
  businessAddress: string
  mission_heading: string
  mission_intro: string
  vision_heading: string
  vision_intro: string
  vision_sub: string
}

export type TitleDescription = { id?: number; order?: number; title: string; description: string }
export type Pillar = { id?: number; order?: number; title: string }
export type Market = { id?: number; order?: number; country: string; description: string }
export type Journey = { id?: number; order?: number; value: string; label: string }
export type MissionPoint = { id?: number; order?: number; text: string }
export type VisionFuture = { id?: number; order?: number; title: string; description: string }
export type Client = { id?: number; order?: number; name: string; category: string; logo_url: string | null }
export type ClientGroup = { category: string; names: string[] }
export type TeamMember = { id?: number; order?: number; name: string; role: string; color: string; photo_url: string | null }

export type ServiceItem = { title: string; description: string }
export type ServiceGroup = { heading: string; items: ServiceItem[] }
export type ServiceClientGroup = { category: string; names: string[] }
export type Service = {
  id: number
  order: number
  slug: string
  title: string
  tagline: string
  intro: string
  groups: ServiceGroup[]
  clientGroups: ServiceClientGroup[] | null
}

export type Product = {
  id: number
  order: number
  slug: string
  title: string
  category: string | null
  summary: string
  description: string | null
  images: string[]
  active: boolean
}

export type Highlight = {
  id: number
  order: number
  slug: string
  title: string
  date_label: string | null
  cover_image: string | null
  summary: string
  content: string | null
  images: string[]
  active: boolean
}
