export type Projects = {
	__typename: 'Projects'
	sys?: {
		id?: string
	}
	title?: string
	caption?: string
	desc?: {
		json?: any
	}
	releaseDate?: string
	link?: string
	previewImage?: {
		description?: string
		url?: string
	}
}
