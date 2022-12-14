import { useQuery } from '@apollo/client';
import { Github } from 'lucide-react';

import { GET_USER_INFO_QUERY, type UserInfoQueryResult } from '@/queries/user';
import { Loading } from '../Loading';
import { ConnectGitHub, Photo } from './styled';

export const Profile = () => {
  const { loading, error, data } =
    useQuery<UserInfoQueryResult>(GET_USER_INFO_QUERY);
  const { viewer } = data || {};

  if (loading) return <Loading />;

  return (
    <>
      <h1>Profile</h1>
      {error ? (
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
        <section id={'profile'}>
          <Photo
            src={
              viewer?.avatarUrl || `https://unavatar.io/github/${viewer?.login}`
            }
            width={96}
            height={96}
          />
          <p>{viewer?.name}</p>
        </section>
      )}
    </>
  );
};
