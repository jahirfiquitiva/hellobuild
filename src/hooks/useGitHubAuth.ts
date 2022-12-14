import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toastConfig } from '@/utils/toast';

interface TokenResponse {
  token: {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
}

interface HookReturnType {
  loading?: boolean;
  token?: string | null;
}

export const useGitHubAuth = (
  latestUserGitHubToken?: string,
): HookReturnType => {
  const [searchParams] = useSearchParams();
  const code = searchParams?.get('code');
  const [loading, setLoading] = useState<boolean>(false);
  const [ghAccessToken, setGitHubAccessToken] = useState<
    string | undefined | null
  >(() => {
    return sessionStorage.getItem('gh_token');
  });

  useEffect(() => {
    if (!latestUserGitHubToken) return;
    const currentToken = sessionStorage.getItem('gh_token');
    if (currentToken !== latestUserGitHubToken) {
      sessionStorage.setItem('gh_token', latestUserGitHubToken);
      setGitHubAccessToken(latestUserGitHubToken);
    }
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
          sessionStorage.setItem('gh_token', responseToken || '');
          setGitHubAccessToken(responseToken || null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastConfig);
        setLoading(false);
      });
  }, [code, ghAccessToken]);

  return { token: ghAccessToken, loading };
};
