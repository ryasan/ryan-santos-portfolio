import { gql } from 'graphql-request'
import {
	ABOUT_SECTION_FRAGMENT,
	ARTICLE_GRID_SECTION_FRAGMENT,
	CAROUSEL_SECTION_FRAGMENT,
	CONTACT_SECTION_FRAGMENT,
	EXPERIENCE_SECTION_FRAGMENT,
	FEATURED_ARTICLES_SECTION_FRAGMENT,
	HERO_CUBE_SECTION_FRAGMENT,
	HERO_SECTION_FRAGMENT,
	MARQUEE_SECTION_FRAGMENT,
	SEO_METADATA_FRAGMENT,
	SOCIAL_SECTION_FRAGMENT,
	TEXT_REVEAL_SECTION_FRAGMENT,
} from './fragments'

export const GET_CONTACT_SECTION_QUERY = gql`
	query GetContactSection($internalName: String) {
		contactSectionCollection(where: { internalName: $internalName }, limit: 1) {
			items {
				...ContactSectionFields
			}
		}
	}
	${CONTACT_SECTION_FRAGMENT}
`

export const GET_PAGE_BY_SLUG_QUERY = gql`
	query GetPageBySlug($slug: String) {
		pageCollection(where: { slug: $slug }, limit: 1) {
			items {
				slug
				jumpLinksEnabled
				seoMetadata {
					...SeoMetadataFields
				}
				pageSectionsCollection {
					__typename
					items {
						...AboutSectionFields
						...ArticleGridSectionFields
						...CarouselSectionFields
						...ContactSectionFields
						...ExperienceSectionFields
						...FeaturedArticlesSectionFields
						...HeroCubeSectionFields
						...HeroSectionFields
						...MarqueeSectionFields
						...SocialSectionFields
						...TextRevealSectionFields
					}
				}
			}
		}
	}
	${ABOUT_SECTION_FRAGMENT}
	${ARTICLE_GRID_SECTION_FRAGMENT}
	${CAROUSEL_SECTION_FRAGMENT}
	${CONTACT_SECTION_FRAGMENT}
	${EXPERIENCE_SECTION_FRAGMENT}
	${FEATURED_ARTICLES_SECTION_FRAGMENT}
	${HERO_CUBE_SECTION_FRAGMENT}
	${HERO_SECTION_FRAGMENT}
	${MARQUEE_SECTION_FRAGMENT}
	${SEO_METADATA_FRAGMENT}
	${SOCIAL_SECTION_FRAGMENT}
	${TEXT_REVEAL_SECTION_FRAGMENT}
`

export const GET_ALL_PAGES_QUERY = gql`
	query GetAllPages {
		pageCollection {
			items {
				slug
				sys {
					publishedAt
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
