import {
  createContext,
  useContext,
  useState,
  useEffect,
  type FC,
  type ReactNode,
} from 'react';

import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import { toastConfig } from '@/utils/toast';
import { useAuth } from './auth-provider';
import { setUserGitHubToken } from '@/utils/firestore-operations';

interface TokenResponse {
  token: {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
}

interface GitHubProviderFields {
  loading?: boolean;
  token?: string | null;
  storeGitHubToken?: (token?: string, force?: boolean) => void;
}
const GitHubContext = createContext<GitHubProviderFields>({});

export const GitHubProvider: FC<{
  children?: ReactNode | ReactNode[] | null;
}> = (props) => {
  const { user, loading: loadingUser } = useAuth();
  const { githubToken: latestUserGitHubToken } = user || {};

  const [searchParams] = useSearchParams();
  const code = searchParams?.get('code');
  const [loading, setLoading] = useState<boolean>(false);
  const [ghAccessToken, setGitHubAccessToken] = useState<
    string | undefined | null
  >(() => {
    return sessionStorage.getItem('gh_token');
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storeGitHubToken = (token?: string, force?: boolean) => {
    if (!token && !force) return;
    if (token) sessionStorage.setItem('gh_token', token);
    else sessionStorage.removeItem('gh_token');
    setGitHubAccessToken(token);
  };

  useEffect(() => {
    if (user?.githubToken) {
      storeGitHubToken?.(user?.githubToken);
    } else {
      setUserGitHubToken(user?.uid || '', ghAccessToken).catch();
    }
  }, [user, storeGitHubToken, ghAccessToken]);

  useEffect(() => {
    if (!latestUserGitHubToken) return;
    const currentToken = sessionStorage.getItem('gh_token');
    if (currentToken !== latestUserGitHubToken)
      storeGitHubToken(latestUserGitHubToken);
  }, [latestUserGitHubToken]);

  useEffect(() => {
    if (!code || (ghAccessToken && ghAccessToken !== 'undefined')) return;
    setLoading(true);
    fetch(`https://hellobuild-back.jahir.dev/token?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((response: TokenResponse) => {
        const { token } = response;
        const { access_token: responseToken } = token || {};
        if (responseToken && responseToken !== 'undefined') {
          storeGitHubToken(responseToken, true);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message, toastConfig);
        setLoading(false);
      });
  }, [code, ghAccessToken]);

  return (
    <GitHubContext.Provider
      value={{
        token: ghAccessToken,
        loading: (loading || loadingUser) && !ghAccessToken,
        storeGitHubToken,
      }}
    >
      {props.children}
    </GitHubContext.Provider>
  );
};

export const useGitHub = (): GitHubProviderFields => {
  return useContext(GitHubContext);
};
