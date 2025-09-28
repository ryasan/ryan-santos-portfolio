export interface GlobalLogo {
	url?: string
	title?: string
	description?: string
}

export interface GlobalHeader {
	logoImageDarkMode?: GlobalLogo
	logoImageLightMode?: GlobalLogo
	logoLink?: {
		url?: string
		label?: string
		internalPage?: {
			slug?: string
		}
	}
	menuItemsCollection?: {
		items?: {
			label?: string
			url?: string
			internalPage?: {
				slug?: string
			}
		}[]
	}
}

export interface GlobalFooter {
	copyRightText?: string
}
