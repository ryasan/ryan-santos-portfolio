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
