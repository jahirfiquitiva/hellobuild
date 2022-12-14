import { gql } from '@apollo/client';

export interface RepositoriesQueryResult {
  viewer?: {
    repositories?: {
      edges?: Array<{
        node?: {
          description?: string;
          forkCount?: number;
          name: string;
          primaryLanguage?: { name: string; color: string };
          stargazerCount?: number;
          updatedAt?: string;
          url: string;
          visibility: 'PUBLIC' | 'PRIVATE';
        };
      }>;
    };
  };
}

export const GET_REPOS_QUERY = gql`
  query Repositories {
    viewer {
      repositories(
        first: 100
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        edges {
          node {
            name
            url
            stargazerCount
            forkCount
            description
            visibility
            updatedAt
            primaryLanguage {
              name
              color
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
        }
      }
    }
  }
`;
