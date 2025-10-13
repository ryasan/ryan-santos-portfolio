import { BLOG_FRAGMENT } from './fragments'
import { gql } from 'graphql-request'

export const GET_ALL_BLOGS_QUERY = gql`
	query GetAllBlogs($order: [BlogOrder]) {
		blogCollection(order: $order) {
			items {
				...BlogFields
			}
		}
	}
	${BLOG_FRAGMENT}
`

export const GET_BLOG_BY_SLUG_QUERY = gql`
	query GetBlogBySlug($slug: String) {
		blogCollection(where: { slug: $slug }) {
			items {
				...BlogFields
			}
		}
	}
	${BLOG_FRAGMENT}
`
