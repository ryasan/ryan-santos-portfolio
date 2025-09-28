import type { PageSection } from '~/types/pages'
import ExperienceSection from './sections/experience-section'
import HeroSection from './sections/hero-section'
import SocialSection from './sections/social-section'

const sections = {
	ExperienceSection: ExperienceSection,
	HeroSection: HeroSection,
	SocialSection: SocialSection,
} as const

type SectionRendererProps = {
	section: PageSection
}

export default function SectionRenderer({ section }: SectionRendererProps) {
	const key = section?.__typename
	const Section = sections[key as keyof typeof sections]

	if (!Section) return null

	return <Section data={section as any} />
}
