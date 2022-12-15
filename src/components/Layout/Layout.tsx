import type { FC, ComponentChild } from '@/types/fc';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_USER_INFO_QUERY, type UserInfoQueryResult } from '@/queries/user';
import {
  Footer,
  Header,
  Main,
  Navigation,
  NavLink,
  NavLinksGroup,
  ProfilePhoto,
  ProfilePill,
} from './styled';
import { withAuth } from '@/components/Auth';
import { useAuth } from '@/providers';
import { useGitHubAuth } from '@/hooks/useGitHubAuth';
import { getUserPhotoUrl } from '@/utils/user-photo';
import type { UserData } from '@/hooks/useFirestoreUser';

const getUserFullName = (user?: UserData | null): string => {
  let fullName = '';
  if (user?.firstName) fullName += user?.firstName;
  if (user?.lastName) fullName += ` ${user?.lastName}`;
  return fullName || '…';
};

export const Layout: FC = (props) => {
  const { children } = props;
  const { user, signOut } = useAuth();
  const { uid } = user || {};
  const { token: githubToken } = useGitHubAuth(user?.githubToken);
  const { data: githubUser } =
    useQuery<UserInfoQueryResult>(GET_USER_INFO_QUERY);
  return (
    <>
      <Header>
        <Navigation>
          {uid ? (
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
          ) : (
            <div>
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
            </div>
          )}
          <NavLinksGroup>
            {uid ? (
              <>
                <li>
                  <NavLink to={'/profile'}>Profile</NavLink>
                </li>
                {Boolean(githubToken) && (
                  <li>
                    <NavLink to={'/favorites'}>Favorites</NavLink>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => {
                      signOut?.();
                    }}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink to={'/'}>Home</NavLink>
              </li>
            )}
          </NavLinksGroup>
        </Navigation>
      </Header>
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export const withLayout = (children: ComponentChild) =>
  withAuth(<Layout>{children}</Layout>);
