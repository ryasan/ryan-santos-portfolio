import { gql } from '~/utils/gql'

export const HERO_SECTION_FRAGMENT = gql`
	fragment HeroSectionFields on HeroSection {
		__typename
		sys {
			id
		}
		isTopOfPage
		title
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

export const EXPERIENCE_SECTION_FRAGMENT = gql`
	fragment ExperienceSectionFields on ExperienceSection {
		__typename
		sys {
			id
		}
		title
		experienceCollection {
			items {
				sys {
					id
				}
				startDate
				endDate
				isCurrent
				company
				jobTitle
				description {
					json
				}
			}
		}
	}
`

export const SOCIAL_SECTION_FRAGMENT = gql`
	fragment SocialSectionFields on SocialSection {
		__typename
		sys {
			id
		}
		title
		socialLinksCollection {
			items {
				label
				url
				icon
			}
		}
	}
`
