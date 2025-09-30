// app/types/pages.ts
export type FlexiblePage = {
	sys: {
		id: string
	}
	title?: string
	slug?: string
	sections?: PageSection[]
	seoMetadata?: {
		title?: string
		description?: string
		ogImage?: {
			url: string
		}
	}
}

export type PageSection = {
	__typename: string
	sys: {
		id: string
	}
} & (
	| CarouselSection
	| CustomSection
	| ExperienceSection
	| HeroSection
	| ProjectsSection
	| SocialSection
)

export type HeroSection = {
	__typename: 'HeroSection'
	sys: {
		id: string
	}
	isTopOfPage?: boolean
	title?: string
	subtitle?: {
		json?: any
	}
	description?: {
		json?: any
	}
	link?: {
		label?: string
		url?: string
	}
	avatar?: {
		url?: string
		title?: string
		description?: string
	}
}

export type ProjectsSection = {
	__typename: 'ProjectsSection'
	sys: {
		id: string
	}
	title?: string
	description?: string
	showFeatured?: boolean
	maxItems?: number
}

export type CustomSection = {
	__typename: 'CustomSection'
	sys: {
		id: string
	}
	title: string
	content: {
		json: any
	}
	layout?: 'default' | 'wide' | 'centered'
}

export type ExperienceItem = {
	sys: {
		id: string
	}
	startDate?: string
	endDate?: string
	isCurrent?: boolean
	company?: string
	jobTitle?: string
	description?: {
		json?: any
	}
}

export type ExperienceSection = {
	__typename: 'ExperienceSection'
	sys: {
		id: string
	}
	title?: string
	experienceCollection?: {
		items?: ExperienceItem[]
	}
}

export type SocialSection = {
	__typename: 'SocialSection'
	sys: {
		id: string
	}
	title?: string
	socialLinksCollection?: {
		items?: {
			label?: string
			url?: string
			icon?: string
		}[]
	}
}

export type CarouselSection = {
	__typename: 'CarouselSection'
	sys: {
		id: string
	}
	slides?: {
		image?: {
			description?: string
			title?: string
			url: string
		}
		title: string
		description: string
	}[]
}
