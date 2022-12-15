import {
  Navigation,
  NavLink,
  NavLinksGroup,
  ProfilePhoto,
  ProfilePill,
  SignOutButton,
  Title,
} from './styled';

import { useAuth } from '@/providers';
import { getUserPhotoUrl } from '@/utils/user-photo';
import type { UserData } from '@/hooks/useFirestoreUser';
import { useGitHubQuery } from '@/hooks/useGitHubQuery';
import { GET_USER_INFO_QUERY, type UserInfoQueryResult } from '@/queries/user';

const getUserFullName = (user?: UserData | null): string => {
  let fullName = '';
  if (user?.firstName) fullName += user?.firstName;
  if (user?.lastName) fullName += ` ${user?.lastName}`;
  return fullName || '…';
};

export const NavigationBar = () => {
  const { userId: uid, user, signOut } = useAuth();
  const { data: githubUser, loading } =
    useGitHubQuery<UserInfoQueryResult>(GET_USER_INFO_QUERY);

  return (
    <header>
      <Navigation>
        {uid && !loading ? (
          <ProfilePill to={'/profile'}>
            <ProfilePhoto
              src={
                githubUser?.viewer?.avatarUrl ||
                getUserPhotoUrl(
                  githubUser?.viewer?.login,
                  githubUser?.viewer?.email || user?.email,
                  githubUser?.viewer?.name || user?.firstName,
                )
              }
              alt={'User avatar'}
            />
            <span>{githubUser?.viewer?.name || getUserFullName(user)}</span>
          </ProfilePill>
        ) : !loading ? (
          <Title>
            <h1>HelloBuild Exercise</h1>
            <small>
              by{' '}
              <a
                href={'https://jahir.dev'}
                rel={'noopener noreferrer'}
                target={'_blank'}
              >
                Jahir Fiquitiva
              </a>
            </small>
          </Title>
        ) : (
          <div />
        )}
        <NavLinksGroup>
          {uid ? (
            <>
              <li>
                <NavLink to={'/profile'}>Profile</NavLink>
              </li>
              {Boolean(githubUser) && !loading && (
                <li>
                  <NavLink to={'/favorites'}>Favorites</NavLink>
                </li>
              )}
              <li>
                <SignOutButton
                  onClick={() => {
                    signOut?.();
                  }}
                >
                  Sign Out
                </SignOutButton>
              </li>
            </>
          ) : (
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
          )}
        </NavLinksGroup>
      </Navigation>
    </header>
  );
};
