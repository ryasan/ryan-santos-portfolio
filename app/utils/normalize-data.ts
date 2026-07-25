import { type Blog, type Projects } from '~/graphql/__generated/sdk'
import { formatPublishMeta } from './reading-time'

const getTags = (data: Blog | Projects) => {
	return data.contentfulMetadata?.tags
		?.map((tag) => tag?.name || '')
		.filter(Boolean)
}

export const normalizeData = {
	fromBlogToCard: (data: Blog) => ({
		caption: null,
		description: data.description,
		eyebrow: formatPublishMeta(
			data.publishDate,
			data.blogBodyMarkdown,
			data.blogBody?.json,
		),
		id: data.sys?.id,
		image: data.openGraphImage,
		link: data.slug ? `/blog/${data.slug}` : null,
		openGraphImage: data.openGraphImage,
		tags: getTags(data),
		title: data.title,
		type: 'blog',
	}),
	fromProjectsToCard: (data: Projects) => ({
		caption: data.caption,
		description: data.desc?.json,
		eyebrow: '',
		id: data.sys?.id,
		image: data.previewImage,
		link: data.link,
		tags: getTags(data),
		title: data.title,
		type: 'projects',
	}),
}

export const normalizeSlide = (data?: Blog | Projects | null) => {
	if (!data) return null

	const slideType = data.__typename

	if (slideType === 'Blog') return normalizeData.fromBlogToCard(data)
	if (slideType === 'Projects') return normalizeData.fromProjectsToCard(data)
	else console.warn(`Unknown slide type: ${slideType}`)
}
