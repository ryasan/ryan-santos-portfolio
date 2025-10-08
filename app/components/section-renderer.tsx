import ArticleGridSection from './sections/article-grid-section'
import CarouselSection from './sections/carousel-section'
import ExperienceSection from './sections/experience-section'
import HeroSection from './sections/hero-section'
import SocialSection from './sections/social-section'
import type { PagePageSectionsItem } from '~/graphql/__generated/sdk'

const sections = {
	ArticleGridSection: ArticleGridSection,
	CarouselSection: CarouselSection,
	ExperienceSection: ExperienceSection,
	HeroSection: HeroSection,
	SocialSection: SocialSection,
} as const

type SectionRendererProps = {
	section: PagePageSectionsItem
}

export default function SectionRenderer({ section }: SectionRendererProps) {
	const key = section?.__typename
	const Section = sections[key as keyof typeof sections]

	if (!Section) return null

	return <Section data={section as any} />
}
