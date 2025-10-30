import { Blog, Projects } from '~/graphql/__generated/sdk'
import { formatDate } from './format-date'

const getTags = (data: Blog | Projects) => {
	return data.contentfulMetadata?.tags
		?.map((tag) => tag?.name || '')
		.filter(Boolean)
}

export const normalizeData = {
	fromBlogToCard: (data: Blog) => ({
		id: data.sys?.id,
		type: 'blog',
		eyebrow: formatDate(data.publishDate || ''),
		title: data.title,
		caption: null,
		description: data.description,
		image: data.openGraphImage?.url,
		link: data.slug,
		tags: getTags(data),
	}),
	fromProjectsToCard: (data: Projects) => ({
		id: data.sys?.id,
		type: 'projects',
		eyebrow: '',
		title: data.title,
		caption: data.caption,
		description: data.desc?.json,
		image: data.previewImage?.url,
		link: data.link,
		tags: getTags(data),
	}),
}

export const normalizeSlide = (data?: Blog | Projects | null) => {
	if (!data) return null

	const slideType = data.__typename

	if (slideType === 'Blog') return normalizeData.fromBlogToCard(data)
	if (slideType === 'Projects') return normalizeData.fromProjectsToCard(data)
	else console.warn(`Unknown slide type: ${slideType}`)
}
