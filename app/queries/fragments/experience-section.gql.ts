import { gql } from '~/utils/gql'

export const EXPERIENCE_SECTION_FRAGMENT = gql`
	fragment ExperienceSectionFields on ExperienceSection {
		__typename
		sys {
			id
		}
		experienceTitle: title
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
