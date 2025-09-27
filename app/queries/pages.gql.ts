import { gql } from '~/utils/gql'

export const GET_PAGE_BY_SLUG_QUERY = gql`
	fragment HeroSectionFields on HeroSection {
		__typename
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

	# fragment ExperienceSectionFields on ExperienceSection {
	# 	__typename
	# 	title
	# 	experienceCollection {
	# 		items {
	# 			startDate
	# 			endDate
	# 			company
	# 			jobTitle
	# 			description {
	# 				json
	# 			}
	# 		}
	# 	}
	# }

	query GetPageBySlug($slug: String) {
		pageCollection(where: { slug: $slug }, limit: 1) {
			items {
				slug
				pageSectionsCollection {
					items {
						...HeroSectionFields

						... on ExperienceSection {
							__typename
							# title
							# experienceCollection {
							# 	items {
							# 		startDate
							# 		endDate
							# 		company
							# 		jobTitle
							# 		description {
							# 			json
							# 		}
							# 	}
							# }
						}
					}
				}
			}
		}
	}
`

export const GET_PAGE_BY_TITLE_QUERY = gql`
	query GetPageByTitle($title: String) {
		pageCollection(where: { title: $title }) {
			items {
				seoMetadata {
					title
					ogImage {
						url
					}
					description
				}
			}
		}
	}
`
