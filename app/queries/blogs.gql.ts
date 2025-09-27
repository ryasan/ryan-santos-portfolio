import { gql } from '~/utils/gql'

export const GET_ALL_BLOGS_QUERY = gql`
  query GetAllBlogs {
    blogCollection(order: sys_firstPublishedAt_DESC) {
      items {
        title
        slug
        description
        tag
        sys {
          firstPublishedAt
        }
        openGraphImage {
          title
          url
        }
      }
    }
  }
`

export const GET_BLOG_BY_SLUG_QUERY = gql`
  query GetBlogBySlug($slug: String) {
    blogCollection(where: { slug: $slug }) {
      items {
        title
        description
        tag
        canonicalUrl
        blogBody {
          json
        }
        sys {
          publishedAt
        }
        openGraphImage {
          url
        }
      }
    }
  }
`
