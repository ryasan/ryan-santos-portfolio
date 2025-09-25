import type { PageSection } from '~/types/pages'
import Hero from './sections/hero'

type SectionRendererProps = {
	section: PageSection
}

export default function SectionRenderer({ section }: SectionRendererProps) {
	const typename = section.__typename

	switch (typename) {
		case 'HeroSection':
			return <Hero data={section} />
		// Add more section types as you build them
		// case 'AboutSection':
		//   return <AboutSection data={section} />
		// case 'ProjectsSection':
		//   return <ProjectsSection data={section} />
		default:
			console.warn(`Unknown section type: ${typename}`)
			return null
	}
}
