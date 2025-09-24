// app/types/pages.ts
export type FlexiblePage = {
  title: string
  slug: string
  sections: PageSection[]
  seoMetadata?: {
    title: string
    description: string
    ogImage?: {
      url: string
    }
  }
}

export type PageSection = {
  __typename: string
  sys: {
    id: string
  }
} & (HeroSection | AboutSection | ProjectsSection | ContactSection | CustomSection)

export type HeroSection = {
  __typename: 'HeroSection'
  title: string
  subtitle?: string
  backgroundImage?: {
    url: string
    description: string
  }
  ctaText?: string
  ctaLink?: string
}

export type AboutSection = {
  __typename: 'AboutSection'
  title: string
  content: {
    json: any
  }
  image?: {
    url: string
    description: string
  }
}

export type ProjectsSection = {
  __typename: 'ProjectsSection'
  title: string
  description?: string
  showFeatured?: boolean
  maxItems?: number
}

export type ContactSection = {
  __typename: 'ContactSection'
  title: string
  description?: string
  email?: string
  socialLinks?: Array<{
    name: string
    url: string
  }>
}

export type CustomSection = {
  __typename: 'CustomSection'
  title: string
  content: {
    json: any
  }
  layout?: 'default' | 'wide' | 'centered'
}
