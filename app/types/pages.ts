// app/types/pages.ts
export type FlexiblePage = {
	sys: {
		id: string
	}
	title: string
	slug: string
	sections: PageSection[]
	seoMetadata?: {
		title: string
		description: string
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
	| HeroSection
	| AboutSection
	| ProjectsSection
	| ContactSection
	| CustomSection
	| ExperienceSection
)

export type HeroSection = {
	__typename: 'HeroSection'
	sys: {
		id: string
	}
	isTopOfPage: boolean
	title: string
	subtitle: {
		json: any
	}
	description: {
		json: any
	}
	link: {
		label: string
		url: string
	}
	avatar: {
		url: string
		title: string
		description: string
	}
}

export type AboutSection = {
	__typename: 'AboutSection'
	sys: {
		id: string
	}
	title: string
	content: {
		json: any
	}
	image?: {
		url: string
		description: string
	}
}

export type ProjectsSection = {
	__typename: 'ProjectsSection'
	sys: {
		id: string
	}
	title: string
	description?: string
	showFeatured?: boolean
	maxItems?: number
}

export type ContactSection = {
	__typename: 'ContactSection'
	sys: {
		id: string
	}
	title: string
	description?: string
	email?: string
	socialLinks?: Array<{
		name: string
		url: string
	}>
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

export type ExperienceSection = {
	__typename: 'ExperienceSection'
	sys: {
		id: string
	}
	title: string
	experienceCollection: {
		items: ExperienceItem[]
	}
}

export type ExperienceItem = {
	sys: {
		id: string
	}
	startDate: string
	endDate: string
	isCurrent: boolean
	company: string
	jobTitle: string
	description: {
		json: any
	}
}
