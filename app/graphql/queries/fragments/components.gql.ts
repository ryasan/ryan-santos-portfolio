import { gql } from 'graphql-request'

export const SEO_METADATA_FRAGMENT = gql`
	fragment SeoMetadataFields on SeoMetaData {
		__typename
		sys {
			id
		}
		title
		description
		ogImage {
			title
			description
			url
		}
	}
`

export const PERSON_FRAGMENT = gql`
	fragment PersonFields on Person {
		__typename
		sys {
			id
		}
		firstName
		lastName
		headline
		avatar {
			title
			description
			url
		}
	}
`

export const BLOG_FRAGMENT = gql`
	fragment BlogFields on Blog {
		__typename
		sys {
			id
		}
		title
		slug
		description
		canonicalUrl
		publishDate
		author {
			...PersonFields
		}
		blogBodyMarkdown
		blogBody {
			json
		}
		openGraphImage {
			title
			description
			url
		}
		contentfulMetadata {
			tags {
				id
				name
			}
		}
	}
	${PERSON_FRAGMENT}
`

export const PROJECTS_FRAGMENT = gql`
	fragment ProjectFields on Projects {
		__typename
		sys {
			id
		}
		title
		caption
		desc {
			json
		}
		releaseDate
		link
		previewImage {
			description
			url
		}
		contentfulMetadata {
			tags {
				id
				name
			}
		}
	}
`
