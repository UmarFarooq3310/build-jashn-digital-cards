export interface LocalizedBlogData {
  title: string
  subtitle: string
  category: string
  seoTitle?: string
  metaDescription?: string
}

export interface LocalizedBlogContent {
  intro: string
  sections: {
    id: string
    title: string
    body: string
    bulletPoints?: string[]
    highlight?: string
  }[]
  faq?: { question: string; answer: string }[]
  conclusion: string
}
