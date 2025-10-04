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
		eyebrow: formatDate(data.sys?.publishedAt || ''),
		title: data.title,
		description: data.description,
		image: data.openGraphImage?.url,
		link: data.slug,
		tags: getTags(data),
	}),
	fromProjectsToCard: (data: Projects) => ({
		id: data.sys?.id,
		eyebrow: formatDate(data.releaseDate || ''),
		title: data.title,
		description: data.caption,
		image: data.previewImage?.url,
		link: data.link,
		tags: getTags(data),
	}),
}
