import type { PageSection } from '~/types/pages'
import HeroSection from './sections/hero-section'
import ExperienceSection from './sections/experience-section'

const sections = {
	HeroSection: HeroSection,
	ExperienceSection: ExperienceSection,
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
