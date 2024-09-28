export type Blog = {
	sys: Sys
	title: string
	slug: string
	description: string
	tag: string[]
}

type Sys = {
	firstPublishedAt: string
}
