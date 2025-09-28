import { gql } from '~/utils/gql'
import { EXPERIENCE_SECTION_FRAGMENT, HERO_SECTION_FRAGMENT, SEO_METADATA_FRAGMENT } from './fragments'

export const GET_PAGE_BY_SLUG_QUERY = gql`
	query GetPageBySlug($slug: String) {
		pageCollection(where: { slug: $slug }, limit: 1) {
			items {
				slug
				seoMetadata {
					...SeoMetadataFields
				}
				pageSectionsCollection {
					__typename
					items {
						...ExperienceSectionFields
						...HeroSectionFields
					}
				}
			}
		}
	}
	${SEO_METADATA_FRAGMENT}
	${EXPERIENCE_SECTION_FRAGMENT}
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
