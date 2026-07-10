import { BLOG_FRAGMENT, PROJECTS_FRAGMENT } from '~/graphql/queries/fragments'
import { gql } from 'graphql-request'

export const HERO_SECTION_FRAGMENT = gql`
	fragment HeroSectionFields on HeroSection {
		__typename
		sys {
			id
		}
		titleWords
		titleWordsMobile
		leftSubtitle
		rightSubtitle
		isTopOfPage
		paddingSize
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

export const ARTICLE_GRID_SECTION_FRAGMENT = gql`
	fragment ArticleGridSectionFields on ArticleGridSection {
		__typename
		sys {
			id
		}
		title
		articlesCollection {
			items {
				__typename
				...ProjectFields
				...BlogFields
			}
		}
	}
`

export const TEXT_REVEAL_SECTION_FRAGMENT = gql`
	fragment TextRevealSectionFields on TextRevealSection {
		__typename
		sys {
			id
		}
		paddingSize
		textRevealListCollection {
			items {
				sys {
					id
				}
				text
				type
			}
		}
	}
`

export const FEATURED_ARTICLES_SECTION_FRAGMENT = gql`
	fragment FeaturedArticlesSectionFields on FeaturedArticlesSection {
		__typename
		sys {
			id
		}
		title
		subtitle
		paddingSize
		featuredArticlesCollection {
			items {
				...ProjectFields
			}
		}
	}
`

export const CONTACT_SECTION_FRAGMENT = gql`
	fragment ContactSectionFields on ContactSection {
		__typename
		sys {
			id
		}
		title
		email
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

export const MARQUEE_SECTION_FRAGMENT = gql`
	fragment MarqueeSectionFields on MarqueeSection {
		__typename
		sys {
			id
		}
		title
		marqueeRowsCollection {
			items {
				sys {
					id
				}
				marqueeItems
			}
		}
	}
`

export const HERO_CUBE_SECTION_FRAGMENT = gql`
	fragment HeroCubeSectionFields on HeroCubeSection {
		__typename
		sys {
			id
		}
		textItems
		isTopOfPage
	}
`
