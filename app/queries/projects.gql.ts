import { PROJECTS_FRAGMENT } from './fragments'
import { gql } from '~/utils/gql'

export const GET_ALL_PROJECTS_QUERY = gql`
  query GetAllProjects {
    projectsCollection(order: releaseDate_DESC) {
      items {
        ...ProjectFields
      }
    }
  }
  ${PROJECTS_FRAGMENT}
`
