import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from 'react'
import { useSearchParams } from '@remix-run/react'
import { Blog, ContentfulTag } from '~/graphql/__generated/sdk'

interface BlogFilterContextValue {
	searchQuery: string
	setSearchQuery: (query: string) => void
	selectedTags: string[]
	tags: ContentfulTag[]
	toggleTag: (tag: string) => void
	clearTags: () => void
	filteredPosts: Blog[]
	setAllPosts: (posts: any[]) => void
	syncFiltersToUrl: () => void
	clearAllFilters: () => void
}

const BlogFilterContext = createContext<BlogFilterContextValue | undefined>(
	undefined,
)

interface BlogFilterProviderProps {
	children: ReactNode
	initialPosts?: Blog[]
}

export function BlogFilterProvider({
	children,
	initialPosts = [],
}: BlogFilterProviderProps) {
	const [searchParams, setSearchParams] = useSearchParams()

	// Initialize state from URL parameters
	const [searchQuery, setSearchQuery] = useState(
		() => searchParams.get('search') || '',
	)
	const [selectedTags, setSelectedTags] = useState<string[]>(() => {
		const tagsParam = searchParams.get('tags')
		return tagsParam ? tagsParam.split(',').filter(Boolean) : []
	})
	const [allPosts, setAllPosts] = useState<Blog[]>(initialPosts)
	const [filteredPosts, setFilteredPosts] = useState<Blog[]>(initialPosts)
	const [tags, setTags] = useState<ContentfulTag[]>([])

	// Update URL parameters when filters change
	useEffect(() => {
		const params = new URLSearchParams()

		if (searchQuery) {
			params.set('search', searchQuery)
		}

		if (selectedTags.length > 0) {
			params.set('tags', selectedTags.join(','))
		}

		// Only update URL if params changed
		const newSearchString = params.toString()
		const currentSearchString = searchParams.toString()

		if (newSearchString !== currentSearchString) {
			setSearchParams(params, { replace: true })
		}
	}, [searchQuery, selectedTags])

	// Filter posts based on search query and selected tags
	useEffect(() => {
		let filtered = [...allPosts]

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase()
			filtered = filtered.filter((post) => {
				const titleMatch = post.title?.toLowerCase().includes(query)
				const descriptionMatch = post.description?.toLowerCase().includes(query)
				const contentMatch = post.blogBody?.json?.toLowerCase().includes(query)
				return titleMatch || descriptionMatch || contentMatch
			})
		}

		// Apply tag filter
		if (selectedTags.length > 0) {
			filtered = filtered.filter((post) => {
				const postTags =
					(post.contentfulMetadata?.tags?.filter(Boolean) as ContentfulTag[]) ||
					[]

				return selectedTags.some((selectedTag) =>
					postTags.some((tag) => tag && tag.name === selectedTag),
				)
			})
		}

		setFilteredPosts(filtered)
	}, [searchQuery, selectedTags, allPosts])

	useEffect(() => {
		const uniqueTags: ContentfulTag[] = []

		allPosts.forEach((post) => {
			post.contentfulMetadata?.tags?.filter(Boolean).forEach((tag) => {
				if (tag && !uniqueTags.some((t) => t?.name === tag?.name)) {
					uniqueTags.push(tag)
				}
			})
		})

		setTags(uniqueTags)
	}, [allPosts])

	const toggleTag = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		)
	}

	const clearTags = () => {
		setSelectedTags([])
	}

	const clearAllFilters = () => {
		setSearchQuery('')
		setSelectedTags([])
		setSearchParams({}, { replace: true })
	}

	const syncFiltersToUrl = () => {
		const params = new URLSearchParams()
		if (searchQuery) params.set('search', searchQuery)
		if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))
		setSearchParams(params, { replace: true })
	}

	const value: BlogFilterContextValue = {
		searchQuery,
		setSearchQuery,
		selectedTags,
		toggleTag,
		clearTags,
		filteredPosts,
		setAllPosts,
		syncFiltersToUrl,
		clearAllFilters,
		tags,
	}

	return (
		<BlogFilterContext.Provider value={value}>
			{children}
		</BlogFilterContext.Provider>
	)
}

export function useBlogFilter() {
	const context = useContext(BlogFilterContext)
	if (context === undefined) {
		throw new Error('useBlogFilter must be used within a BlogFilterProvider')
	}
	return context
}
