import { gql } from '~/utils/gql'

export const GET_ALL_PROJECTS_QUERY = gql`
  query GetAllProjects {
    projectsCollection(order: releaseDate_DESC) {
      items {
        title
        caption
        desc {
          json
        }
        releaseDate
        link
        previewImage {
          description
          url
        }
      }
    }
  }
`
