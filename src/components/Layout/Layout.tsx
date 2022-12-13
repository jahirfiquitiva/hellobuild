import type { FC, ComponentChild } from '@/types/fc';
import { Link } from 'react-router-dom';

import { Footer, Header, Main, Navigation } from './styled';
import { withAuth } from '@/components/Auth';
import { useAuth } from '@/providers';

export const Layout: FC = (props) => {
  const { children } = props;
  const { user, loading, signOut } = useAuth();
  return (
    <>
      <Header>
        <Navigation>
          {user ? (
            <div>
              <img
                src={`https://unavatar.io/${user?.email}`}
                width={48}
                height={48}
                alt={'User profile'}
              />
            </div>
          ) : (
            <h1>HelloBuild</h1>
          )}
          <ul>
            {user ? (
              <>
                <li>
                  <Link to={'/profile'}>Profile</Link>
                </li>
                <li>
                  <Link to={'/favorites'}>Favorites</Link>
                </li>
                <li>
                  <button onClick={() => {signOut?.()}}>Sign Out</button>
                </li>
              </>
            ) : (
              <li>
                <Link to={'/'}>Login</Link>
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
