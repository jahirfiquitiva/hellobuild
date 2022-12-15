import {
  createContext,
  useContext,
  useState,
  useEffect,
  type FC,
  type ReactNode,
} from 'react';

import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const { userId, user } = useAuth();
  const { githubToken: latestUserGitHubToken } = user || {};

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams?.get('code');
  const [loading, setLoading] = useState<boolean>(false);
  const [ghAccessToken, setGitHubAccessToken] = useState<
    string | undefined | null
  >(() => {
    return sessionStorage.getItem('gh_token');
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const storeGitHubToken = (token?: string | null, force?: boolean) => {
    if (!token && !force) return;
    if (token) sessionStorage.setItem('gh_token', token);
    else sessionStorage.removeItem('gh_token');
    setGitHubAccessToken(token);
  };

  useEffect(() => {
    if (user?.githubToken) {
      storeGitHubToken(user?.githubToken);
    } else {
      setUserGitHubToken(userId || user?.uid || '', ghAccessToken).catch();
    }
  }, [user, userId, storeGitHubToken, ghAccessToken]);

  useEffect(() => {
    if (!latestUserGitHubToken) return;
    const currentToken = sessionStorage.getItem('gh_token');
    if (currentToken !== latestUserGitHubToken)
      storeGitHubToken(latestUserGitHubToken);
  }, [latestUserGitHubToken]);

  useEffect(() => {
    if (!code || (ghAccessToken && ghAccessToken !== 'undefined')) {
      if (userId) navigate('/profile');
      return;
    }
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
        const {
          access_token: responseToken,
          error: errorCode,
          error_description: error,
        } = token || {};
        if (responseToken && responseToken !== 'undefined') {
          storeGitHubToken(responseToken, true);
        }
        if (errorCode !== 'bad_verification_code' && error && !ghAccessToken)
          toast.error(error, toastConfig);
        setLoading(false);
        if (userId) navigate('/profile');
      })
      .catch((error) => {
        toast.error(error.message, toastConfig);
        setLoading(false);
        if (userId) navigate('/profile');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, ghAccessToken, userId]);

  const token = user?.githubToken || ghAccessToken;
  return (
    <GitHubContext.Provider
      value={{
        token,
        loading,
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
