export interface TestimonialItem {
  id: string
  name: string
  role: string
  comment: string
  stars: number
  rating?: number
  color?: string
  accentColor?: string
  avatar?: string
  createdAt: number
  location?: string
  country?: string
  city?: string
  isApproved?: boolean
  verified?: boolean
}
