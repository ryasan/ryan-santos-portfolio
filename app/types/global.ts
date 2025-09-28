export interface GlobalHeader {
	logoImage?: {
		url?: string
		title?: string
		description?: string
	}
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
