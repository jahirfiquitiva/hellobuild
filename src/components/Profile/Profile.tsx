import type { FC } from 'react';
import { AtSign, Github, Globe, Users } from 'lucide-react';

import { useAuth } from '@/providers';
import { GET_USER_INFO_QUERY, type UserInfoQueryResult } from '@/queries/user';
import { getUserPhotoUrl } from '@/utils/user-photo';
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
import { useGitHubQuery } from '@/hooks/useGitHubQuery';

interface ProfileProps {
  infoOnly?: boolean;
}

export const Profile: FC<ProfileProps> = (props) => {
  const { infoOnly } = props;
  const { user } = useAuth();
  const { loading, data } =
    useGitHubQuery<UserInfoQueryResult>(GET_USER_INFO_QUERY);
  const { viewer } = data || {};

  const renderProfileError = () => {
    return (
      <>
        <p>
          In order to retrieve your profile data and repositories list, you must
          connect your GitHub account.
        </p>
        <ConnectGitHub
          href={`https://github.com/login/oauth/authorize?client_id=Iv1.8aae692ae0ec6ccf&redirect_uri=${encodeURI(
            `${window?.location?.origin || ''}?authorized=true`,
          )}`}
          css={infoOnly ? {} : { marginTop: '-2rem' }}
        >
          <Github />
          <span>Connect to GitHub</span>
        </ConnectGitHub>
      </>
    );
  };

  if (infoOnly) {
    if (!viewer && !loading) return renderProfileError();
    return null;
  }

  return (
    <ProfileSection id={'profile'}>
      <h1>Profile</h1>
      {(!user || loading) && !viewer && (
        <Loading useLine text={'Loading profile details…'} />
      )}
      {viewer ? (
        <>
          <PhotoAndInfo>
            <Photo
              src={
                viewer?.avatarUrl ||
                getUserPhotoUrl(viewer?.login, user?.email, user?.firstName)
              }
              alt={'User avatar'}
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
        </>
      ) : !loading ? (
        renderProfileError()
      ) : null}
    </ProfileSection>
  );
};
