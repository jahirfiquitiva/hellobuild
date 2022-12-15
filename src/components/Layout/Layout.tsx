import type { FC, ComponentChild } from '@/types/fc';
import { Link } from 'react-router-dom';

import {
  Footer,
  Header,
  Main,
  Navigation,
  ProfilePhoto,
  ProfilePill,
} from './styled';
import { withAuth } from '@/components/Auth';
import { useAuth } from '@/providers';
import { useGitHubAuth } from '@/hooks/useGitHubAuth';

export const Layout: FC = (props) => {
  const { children } = props;
  const { user, signOut } = useAuth();
  const { uid } = user || {};
  const { token: githubToken } = useGitHubAuth(user?.githubToken);
  return (
    <>
      <Header>
        <Navigation>
          {uid ? (
            <ProfilePill to={'/profile'}>
              <ProfilePhoto
                src={`https://unavatar.io/${user?.email}`}
                alt={'User avatar'}
              />
              <span>
                {user?.firstName} {user?.lastName}
              </span>
            </ProfilePill>
          ) : (
            <div>
              <h1>HelloBuild Exercise</h1>
              <small>
                by <a href={'https://jahir.dev'}>Jahir Fiquitiva</a>
              </small>
            </div>
          )}
          <ul>
            {uid ? (
              <>
                <li>
                  <Link to={'/profile'}>Profile</Link>
                </li>
                {Boolean(githubToken) && (
                  <li>
                    <Link to={'/favorites'}>Favorites</Link>
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
                <Link to={'/'}>Home</Link>
              </li>
            )}
          </ul>
        </Navigation>
      </Header>
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export const withLayout = (children: ComponentChild) =>
  withAuth(<Layout>{children}</Layout>);
