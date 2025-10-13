/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
// import { getPlaiceholder } from 'plaiceholder';

import {
	GET_GLOBAL_HEADER_QUERY,
	GET_GLOBAL_FOOTER_QUERY,
	GET_ALL_BLOGS_QUERY,
	GET_ALL_PROJECTS_QUERY,
	GET_BLOG_BY_SLUG_QUERY,
	GET_PAGE_BY_SLUG_QUERY,
	GET_PAGE_BY_TITLE_QUERY,
} from '~/graphql/queries'

const CONTENTFUL_SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const CONTENTFUL_ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
	throw new Error('Contentful space ID and access token must be provided.')
}

// async function fetchFileAsBuffer(url: string): Promise<Buffer> {
//   const response = await axios.get(url, { responseType: 'arraybuffer' });
//   return Buffer.from(response.data);
// }

async function apiCall(query: string, variables?: any) {
	const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}/environments/master`
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
		},
		body: JSON.stringify({ query, variables }),
	}

	return await fetch(fetchUrl, options)
}

async function getGlobalHeader() {
	try {
		const response = await apiCall(GET_GLOBAL_HEADER_QUERY)
		const json = await response.json()
		return await json.data.globalHeaderCollection.items[0]
	} catch (error) {
		console.error(
			'Something went wrong while fetching the global header',
			error,
		)
		throw error
	}
}

async function getGlobalFooter() {
	try {
		const response = await apiCall(GET_GLOBAL_FOOTER_QUERY)
		const json = await response.json()
		return await json.data.globalFooterCollection.items[0]
	} catch (error) {
		console.error(
			'Something went wrong while fetching the global footer',
			error,
		)
		throw error
	}
}

async function getAllProjects() {
	try {
		const response = await apiCall(GET_ALL_PROJECTS_QUERY)
		const json = await response.json()

		const formattedData = await json.data.projectsCollection.items.map(
			async (project: Record<string, any>) => {
				const { title, desc, releaseDate, link, previewImage, caption } =
					project
				// const fileBuffer = await fetchFileAsBuffer(previewImage.url);
				// const placeholder = await getPlaiceholder(fileBuffer);
				return {
					title,
					caption,
					desc,
					releaseDate,
					link,
					// placeholder,
					placeholder: null,
					image: previewImage.url,
					imageAlt: previewImage.description,
				}
			},
		)

		return Promise.all(formattedData)
	} catch (error) {
		console.error('Something went wrong while fetching all projects', error)
		throw error
	}
}

async function getAllBlogs(order?: string) {
	try {
		const response = await apiCall(GET_ALL_BLOGS_QUERY, { order })
		const json = await response.json()
		return await json.data.blogCollection.items
	} catch (error) {
		console.error('Something went wrong while fetching all blogs', error)
		throw error
	}
}

async function getBlogBySlug(slug: string) {
	try {
		const response = await apiCall(GET_BLOG_BY_SLUG_QUERY, { slug })
		const json = await response.json()
		return await json.data.blogCollection.items[0]
	} catch (error) {
		console.error('Something went wrong while fetching the blog by slug', error)
		throw error
	}
}

async function getPageByTitle(title: string) {
	try {
		const response = await apiCall(GET_PAGE_BY_TITLE_QUERY, { title })
		const json = await response.json()
		return await json.data.pageCollection.items[0]
	} catch (error) {
		console.error(
			'Something went wrong while fetching the page by title',
			error,
		)
		throw error
	}
}

async function getPageBySlug(slug: string) {
	try {
		const response = await apiCall(GET_PAGE_BY_SLUG_QUERY, { slug })
		const json = await response.json()
		return await json.data.pageCollection.items[0]
	} catch (error) {
		console.error('Something went wrong while fetching the page by slug', error)
		throw error
	}
}

export const client = {
	getGlobalHeader,
	getGlobalFooter,
	getAllBlogs,
	getAllProjects,
	getBlogBySlug,
	getPageBySlug,
	getPageByTitle,
}
