import { useQuery } from '@apollo/client';

import { GET_USER_INFO_QUERY, type UserInfoQueryResult } from '@/queries/user';
import { Loading } from '../Loading';

export const Profile = () => {
  const { loading, error, data } =
    useQuery<UserInfoQueryResult>(GET_USER_INFO_QUERY);
  const { viewer } = data || {};

  if (loading) return <Loading />;

  return (
    <div>
      {error ? (
        <a
          href={`https://github.com/login/oauth/authorize?client_id=Iv1.8aae692ae0ec6ccf&redirect_uri=${encodeURI(
            `${window?.location?.origin || ''}?authorized=true`,
          )}`}
        >
          Connect to GitHub
        </a>
      ) : (
        <div>{viewer?.name}</div>
      )}
    </div>
  );
};
