import type { FC, ReactNode } from 'react';

import { withAuth } from '@/components/Auth';
import { GitHubProvider } from '@/providers';
import { Footer, Main } from './styled';
import { NavigationBar } from './NavigationBar';

const Layout: FC<{ children?: ReactNode | ReactNode[] | null }> = (props) => {
  return (
    <>
      <GitHubProvider>
        <NavigationBar />
      </GitHubProvider>
      <Main>{props.children}</Main>
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
