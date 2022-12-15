import type { FC, ReactNode } from 'react';

import { GET_USER_INFO_QUERY, type UserInfoQueryResult } from '@/queries/user';
import {
  Footer,
  Main,
  Navigation,
  NavLink,
  NavLinksGroup,
  ProfilePhoto,
  ProfilePill,
  SignOutButton,
  Title,
} from './styled';
import { withAuth } from '@/components/Auth';
import { useAuth } from '@/providers';
import { getUserPhotoUrl } from '@/utils/user-photo';
import type { UserData } from '@/hooks/useFirestoreUser';
import { useGitHubQuery } from '@/hooks/useGitHubQuery';

const getUserFullName = (user?: UserData | null): string => {
  let fullName = '';
  if (user?.firstName) fullName += user?.firstName;
  if (user?.lastName) fullName += ` ${user?.lastName}`;
  return fullName || '…';
};

export const Layout: FC<{ children?: ReactNode | ReactNode[] | null }> = (
  props,
) => {
  const { children } = props;
  const { user, signOut } = useAuth();
  const { uid } = user || {};
  const { data: githubUser } =
    useGitHubQuery<UserInfoQueryResult>(GET_USER_INFO_QUERY);

  return (
    <>
      <header>
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
          )}
          <NavLinksGroup>
            {uid ? (
              <>
                <li>
                  <NavLink to={'/profile'}>Profile</NavLink>
                </li>
                {Boolean(githubUser) && (
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
      <Main>{children}</Main>
      <Footer>
        <p>
          Project developed by{' '}
          <a
            href={'https://jahir.dev'}
            rel={'noopener noreferrer'}
            target={'_blank'}
          >
            Jahir Fiquitiva
          </a>
        </p>
        <a
          href={'https://github.com/jahirfiquitiva/hellobuild'}
          rel={'noopener noreferrer'}
          target={'_blank'}
        >
          View source code
        </a>
      </Footer>
    </>
  );
};

export const withLayout = (children?: ReactNode | ReactNode[] | null) =>
  withAuth(<Layout>{children}</Layout>);
