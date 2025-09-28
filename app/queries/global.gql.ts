import { gql } from '~/utils/gql'

export const GET_GLOBAL_HEADER_QUERY = gql`
	query GetGlobalHeader {
		globalHeaderCollection(where: { internalName: "Global Header" }) {
			items {
				logoImageDarkMode {
					url
					title
					description
				}
				logoImageLightMode {
					url
					title
					description
				}
				logoLink {
					url
					label
					internalPage {
						slug
					}
				}
				menuItemsCollection {
					items {
						label
						url
						internalPage {
							slug
						}
					}
				}
			}
		}
	}
`

export const GET_GLOBAL_FOOTER_QUERY = gql`
	query GetGlobalFooter {
		globalFooterCollection(where: { internalName: "Global Footer" }) {
			items {
				copyRightText
			}
		}
	}
`
