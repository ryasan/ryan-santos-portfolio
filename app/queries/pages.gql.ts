import { gql } from '~/utils/gql'
import {
	CAROUSEL_SECTION_FRAGMENT,
	EXPERIENCE_SECTION_FRAGMENT,
	HERO_SECTION_FRAGMENT,
	SEO_METADATA_FRAGMENT,
	SOCIAL_SECTION_FRAGMENT,
} from './fragments'

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
						...CarouselSectionFields
						...ExperienceSectionFields
						...HeroSectionFields
						...SocialSectionFields
					}
				}
			}
		}
	}
	${CAROUSEL_SECTION_FRAGMENT}
	${EXPERIENCE_SECTION_FRAGMENT}
	${HERO_SECTION_FRAGMENT}
	${SEO_METADATA_FRAGMENT}
	${SOCIAL_SECTION_FRAGMENT}
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
