import { type Blog, type Projects } from '~/graphql/__generated/sdk'
import { formatDateWithMonth } from './format-date'

const getTags = (data: Blog | Projects) => {
	return data.contentfulMetadata?.tags
		?.map((tag) => tag?.name || '')
		.filter(Boolean)
}

export const normalizeData = {
	fromBlogToCard: (data: Blog) => ({
		caption: null,
		description: data.description,
		eyebrow: formatDateWithMonth(data.publishDate || ''),
		id: data.sys?.id,
		image: data.openGraphImage?.url,
		link: data.slug,
		tags: getTags(data),
		title: data.title,
		type: 'blog',
	}),
	fromProjectsToCard: (data: Projects) => ({
		caption: data.caption,
		description: data.desc?.json,
		eyebrow: '',
		id: data.sys?.id,
		image: data.previewImage?.url,
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
