import RichText from '~/components/rich-text'
import type { ExperienceSection } from '~/types'

type ExperienceSectionProps = {
	data?: ExperienceSection
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
	console.log(data)
	return null
}
