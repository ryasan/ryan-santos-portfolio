import { gql } from '~/utils/gql'
import { HERO_SECTION_FRAGMENT } from './fragments/hero-section.gql'

export const GET_PAGE_BY_SLUG_QUERY = gql`
	query GetPageBySlug($slug: String) {
		pageCollection(where: { slug: $slug }, limit: 1) {
			items {
				slug
				pageSectionsCollection {
					items {
						...HeroSectionFields

						... on ExperienceSection {
							__typename
							sys {
								id
							}
							experienceTitle: title
							experienceCollection {
								items {
									startDate
									endDate
									company
									jobTitle
									description {
										json
									}
								}
							}
						}
					}
				}
			}
		}
	}
	${HERO_SECTION_FRAGMENT}
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
