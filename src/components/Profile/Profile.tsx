import { useQuery } from '@apollo/client';
import { AtSign, Github, Globe, Users } from 'lucide-react';

import { GET_USER_INFO_QUERY, type UserInfoQueryResult } from '@/queries/user';
import { Loading } from '../Loading';
import {
  ConnectGitHub,
  FollowersFollowing,
  FollowersFollowingLink,
  IconLink,
  Photo,
  PhotoAndInfo,
  ProfileInfo,
  ProfileSection,
} from './styled';

export const Profile = () => {
  const { loading, error, data } =
    useQuery<UserInfoQueryResult>(GET_USER_INFO_QUERY);
  const { viewer } = data || {};

  if (loading) return <Loading />;
  return (
    <>
      <h1>Profile</h1>
      {error || !viewer ? (
        <>
          <p>
            In order to retrieve your profile data and repositories list, you
            must connect your GitHub account.
          </p>
          <ConnectGitHub
            href={`https://github.com/login/oauth/authorize?client_id=Iv1.8aae692ae0ec6ccf&redirect_uri=${encodeURI(
              `${window?.location?.origin || ''}?authorized=true`,
            )}`}
          >
            <Github />
            <span>Connect to GitHub</span>
          </ConnectGitHub>
        </>
      ) : (
        <ProfileSection id={'profile'}>
          <PhotoAndInfo>
            <Photo
              src={
                viewer?.avatarUrl ||
                `https://unavatar.io/github/${viewer?.login}`
              }
            />
            <ProfileInfo className={'truncate'}>
              <strong>{viewer?.name}</strong>
              <IconLink
                href={`https://github.com/${viewer?.login}`}
                rel={'noopener noreferrer'}
                target={'_blank'}
              >
                <AtSign size={20} />
                <span>{viewer?.login}</span>
              </IconLink>
              {Boolean(viewer?.websiteUrl) && (
                <IconLink
                  href={viewer?.websiteUrl}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  <Globe size={20} />
                  <span>{viewer?.websiteUrl}</span>
                </IconLink>
              )}
            </ProfileInfo>
          </PhotoAndInfo>
          <ProfileInfo>
            <p>{viewer?.bio}</p>
            <FollowersFollowing>
              <Users size={16} />
              <span>
                <FollowersFollowingLink
                  href={`https://github.com/${viewer?.login}?tab=followers`}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  {viewer?.followers?.totalCount} Followers
                </FollowersFollowingLink>
              </span>
              <span> • </span>
              <span>
                <FollowersFollowingLink
                  href={`https://github.com/${viewer?.login}?tab=following`}
                  rel={'noopener noreferrer'}
                  target={'_blank'}
                >
                  {viewer?.following?.totalCount} Following
                </FollowersFollowingLink>
              </span>
            </FollowersFollowing>
          </ProfileInfo>
        </ProfileSection>
      )}
    </>
  );
};
