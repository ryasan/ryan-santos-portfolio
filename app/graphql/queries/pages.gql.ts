import { gql } from 'graphql-request'
import {
	ARTICLE_GRID_SECTION_FRAGMENT,
	CAROUSEL_SECTION_FRAGMENT,
	CONTACT_SECTION_FRAGMENT,
	EXPERIENCE_SECTION_FRAGMENT,
	FEATURED_ARTICLES_SECTION_FRAGMENT,
	HERO_SECTION_FRAGMENT,
	SEO_METADATA_FRAGMENT,
	SOCIAL_SECTION_FRAGMENT,
	TERMINAL_ANIMATION_SECTION_FRAGMENT,
	TEXT_REVEAL_SECTION_FRAGMENT,
} from './fragments'

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
						...ArticleGridSectionFields
						...CarouselSectionFields
						...ContactSectionFields
						...ExperienceSectionFields
						...FeaturedArticlesSectionFields
						...HeroSectionFields
						...SocialSectionFields
						...TerminalAnimationSectionFields
						...TextRevealSectionFields
					}
				}
			}
		}
	}
	${ARTICLE_GRID_SECTION_FRAGMENT}
	${CAROUSEL_SECTION_FRAGMENT}
	${CONTACT_SECTION_FRAGMENT}
	${EXPERIENCE_SECTION_FRAGMENT}
	${FEATURED_ARTICLES_SECTION_FRAGMENT}
	${HERO_SECTION_FRAGMENT}
	${SEO_METADATA_FRAGMENT}
	${SOCIAL_SECTION_FRAGMENT}
	${TERMINAL_ANIMATION_SECTION_FRAGMENT}
	${TEXT_REVEAL_SECTION_FRAGMENT}
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
