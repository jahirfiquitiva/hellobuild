import { gql } from '@apollo/client';

export interface RepositoryData {
  description?: string;
  forkCount?: number;
  name: string;
  nameWithOwner: string;
  primaryLanguage?: { name: string; color: string };
  stargazerCount?: number;
  updatedAt?: string;
  url: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  isArchived?: boolean;
  isDisabled?: boolean;
  isEmpty?: boolean;
  isPrivate?: boolean;
  isTemplate?: boolean;
}

export interface RepositoriesQueryResult {
  viewer?: {
    login: string;
    repositories?: {
      totalCount?: number
      edges?: Array<{
        node?: RepositoryData;
      }>;
    };
  };
}

export const GET_REPOS_QUERY = gql`
  query Repositories {
    viewer {
      login
      repositories(
        first: 100
        orderBy: { field: UPDATED_AT, direction: DESC }
        affiliations: OWNER
        ownerAffiliations: OWNER
      ) {
        totalCount
        edges {
          node {
            name
            nameWithOwner
            url
            stargazerCount
            forkCount
            description
            visibility
            updatedAt
            isArchived
            isDisabled
            isEmpty
            isPrivate
            isTemplate
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
