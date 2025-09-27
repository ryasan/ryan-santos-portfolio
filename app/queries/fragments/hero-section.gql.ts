import { gql } from '~/utils/gql'

export const HERO_SECTION_FRAGMENT = gql`
	fragment HeroSectionFields on HeroSection {
		__typename
		sys {
			id
		}
		isTopOfPage
		title {
			json
		}
		subtitle {
			json
		}
		description {
			json
		}
		link {
			label
			url
		}
		avatar {
			url
			title
			description
		}
	}
`
