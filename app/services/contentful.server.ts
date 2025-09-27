/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios';
// import { getPlaiceholder } from 'plaiceholder';

import {
	GET_ALL_PROJECTS_QUERY,
	GET_ALL_BLOGS_QUERY,
	GET_BLOG_BY_SLUG_QUERY,
	GET_PAGE_BY_SLUG_QUERY,
	GET_PAGE_BY_TITLE_QUERY,
} from '~/queries'

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
		return null
	}
}

async function getAllBlogs() {
	try {
		const response = await apiCall(GET_ALL_BLOGS_QUERY)
		const json = await response.json()
		return await json.data.blogCollection.items
	} catch (error) {
		console.error('Something went wrong while fetching all blogs', error)
		return null
	}
}

async function getBlogBySlug(slug: string) {
	const variables = {
		slug: slug,
	}

	try {
		const response = await apiCall(GET_BLOG_BY_SLUG_QUERY, variables)
		const json = await response.json()
		return await json.data.blogCollection.items[0]
	} catch (error) {
		console.error('Something went wrong while fetching the blog by slug', error)
		return null
	}
}

async function getPageByTitle(title: string) {
	const variables = {
		title: title,
	}

	try {
		const response = await apiCall(GET_PAGE_BY_TITLE_QUERY, variables)
		const json = await response.json()
		return await json.data.pageCollection.items[0]
	} catch (error) {
		console.error(
			'Something went wrong while fetching the page by title',
			error,
		)
		return null
	}
}

async function getPageBySlug(slug: string) {
	const query = `
		query ($slug: String) {
		  pageCollection(where: { slug: $slug }, limit: 1) {
		    items {
		      slug
		      pageSectionsCollection {
		        items {
		          ... on HeroSection {
								__typename
		            isTopOfPage
		            title {
		              json
		            }
		            subtitle {
		              json
		            }
		            description {
		              json
		            }
		            link {
		              label
		              url
		            }
		            avatar {
		              url
		              title
		              description
		            }
		          }
		        }
		      }
		    }
		  }
		}
  `

	const variables = { slug }

	try {
		const response = await apiCall(GET_PAGE_BY_SLUG_QUERY, variables)
		const json = await response.json()
		return await json.data.pageCollection.items[0]
	} catch (error) {
		console.error('Something went wrong while fetching the page by slug', error)
		return null
	}
}

export const client = {
	getAllProjects,
	getAllBlogs,
	getBlogBySlug,
	getPageByTitle,
	getPageBySlug,
}
