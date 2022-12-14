import { gql } from '@apollo/client';

export interface UserInfoQueryResult {
  viewer: {
    name: string;
    login: string;
    email?: string;
    bio?: string;
    company?: string;
    avatarUrl?: string;
    websiteUrl?: string;
    followers?: {
      totalCount?: number;
    };
    following?: {
      totalCount?: number;
    };
  };
}

export const GET_USER_INFO_QUERY = gql`
  query UserInfo {
    viewer {
      name
      login
      email
      bio
      company
      avatarUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      websiteUrl
    }
  }
`;
