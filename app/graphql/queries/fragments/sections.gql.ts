import { BLOG_FRAGMENT, PROJECTS_FRAGMENT } from '~/graphql/queries/fragments'
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
				title {
					json
				}
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
				sys {
					id
				}
				label
				url
				icon
			}
		}
	}
`

export const CAROUSEL_SECTION_FRAGMENT = gql`
	fragment CarouselSectionFields on CarouselSection {
		__typename
		sys {
			id
		}
		title
		slidesPerView
		slidesCollection {
			items {
				__typename
				...BlogFields
				...ProjectFields
			}
		}
	}
	${BLOG_FRAGMENT}
	${PROJECTS_FRAGMENT}
`
