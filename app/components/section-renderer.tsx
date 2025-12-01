import ArticleGridSection from './sections/article-grid-section'
import CarouselSection from './sections/carousel-section'
import ContactSection from './sections/contact-section'
import ExperienceSection from './sections/experience-section'
import FeaturedArticlesSection from './sections/featured-articles-section'
import HeroSection from './sections/hero-section'
import MarqueeSection from '~/components/sections/marquee-section';
import SocialSection from './sections/social-section'
import TextRevealSection from './sections/text-reveal-section'
import type { PagePageSectionsItem } from '~/graphql/__generated/sdk'

const sections = {
	ArticleGridSection: ArticleGridSection,
	CarouselSection: CarouselSection,
	ContactSection: ContactSection,
	ExperienceSection: ExperienceSection,
	FeaturedArticlesSection: FeaturedArticlesSection,
	HeroSection: HeroSection,
	MarqueeSection: MarqueeSection,
	SocialSection: SocialSection,
	TextRevealSection: TextRevealSection,
} as const

type SectionRendererProps = {
	section: PagePageSectionsItem
	id?: string
}

export default function SectionRenderer({ section, id }: SectionRendererProps) {
	const key = section?.__typename
	const PageSection = sections[key as keyof typeof sections]

	if (!PageSection) return null

	return <PageSection data={section as any} id={id} />
}
