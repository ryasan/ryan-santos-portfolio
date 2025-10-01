import { gql } from '~/utils/gql'

export const SEO_METADATA_FRAGMENT = gql`
	fragment SeoMetadataFields on SeoMetaData {
		__typename
		title
		description
		ogImage {
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
			publishedAt
		}
		title
		slug
		description
		canonicalUrl
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
