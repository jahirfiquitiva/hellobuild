import { useQuery } from '@apollo/client';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { toastConfig } from '@/lib/toast';

interface TokenResponse {
  token: {
    access_token?: string;
    error?: string;
    error_description?: string;
  };
}

interface HookReturnType {
  token?: string | null;
}

export const useGitHubAuth = (): HookReturnType => {
  const [searchParams] = useSearchParams();
  const code = searchParams?.get('code');
  const [ghAccessToken, setGitHubAccessToken] = useState<string | null>(() => {
    return sessionStorage.getItem('gh_token');
  });

  useEffect(() => {
    if (!code || (ghAccessToken && ghAccessToken !== 'undefined')) return;
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
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message, toastConfig);
      });
  }, [code, ghAccessToken]);

  return { token: ghAccessToken };
};
