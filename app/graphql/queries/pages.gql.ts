import { gql } from 'graphql-request'
import {
	ARTICLE_GRID_SECTION_FRAGMENT,
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
						...ArticleGridSectionFields
						...CarouselSectionFields
						...ExperienceSectionFields
						...HeroSectionFields
						...SocialSectionFields
					}
				}
			}
		}
	}
	${ARTICLE_GRID_SECTION_FRAGMENT}
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
