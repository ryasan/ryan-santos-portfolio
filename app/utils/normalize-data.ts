import { Blog, Projects } from '~/types'
import { formatDate } from './format-date'

export const normalizeData = {
	fromBlogToCard: (data: Blog) => {
		return {
			eyebrow: formatDate(data.sys?.publishedAt || ''),
			title: data.title,
			description: data.description,
			image: data.openGraphImage?.url,
			link: data.slug,
			tags: data.contentfulMetadata?.tags?.map((tag) => tag.name),
		}
	},
	fromProjectsToCard: (data: Projects) => {
		return {
			eyebrow: formatDate(data.releaseDate || ''),
			title: data.title,
			description: data.caption,
			image: data.previewImage?.url,
			link: data.link,
			tags: data.contentfulMetadata?.tags?.map((tag) => tag.name),
		}
	},
}
