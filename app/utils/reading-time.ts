import { formatDateWithMonth } from './format-date'

const WORDS_PER_MINUTE = 200

const getTextFromRichText = (node: unknown): string => {
	if (!node || typeof node !== 'object') return ''

	const current = node as { content?: unknown[]; value?: string }

	if (typeof current.value === 'string') return current.value

	if (Array.isArray(current.content)) {
		return current.content.map(getTextFromRichText).join(' ')
	}

	return ''
}

const getPlainText = (content: string) => {
	return content
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/[#*_~>[\]()|-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

export const getReadingTime = (
	markdown?: string | null,
	richTextJson?: unknown,
) => {
	const content = markdown?.trim()
		? markdown
		: getTextFromRichText(richTextJson)

	if (!content?.trim()) return ''

	const words = getPlainText(content).split(' ').filter(Boolean).length
	const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

	return `${minutes} min read`
}

export const formatPublishMeta = (
	publishDate?: string | null,
	markdown?: string | null,
	richTextJson?: unknown,
) => {
	const date = formatDateWithMonth(publishDate || '')
	const readingTime = getReadingTime(markdown, richTextJson)

	return [date, readingTime].filter(Boolean).join('\u00A0\u00A0•\u00A0\u00A0')
}
