import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Tabs } from '@/components/Tabs';
import { useAuth } from '@/providers';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { PasswordReset } from './PasswordReset';
import { Loading } from '../Loading';

export const Auth = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const githubCode = searchParams?.get('code');

  useEffect(() => {
    if (userId && !githubCode) navigate('/profile');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, githubCode]);

  if (githubCode) return <Loading />;
  return (
    <Tabs
      tabsCount={3}
      getTabTitle={(index) => {
        if (index === 0) return 'Sign In';
        if (index === 1) return 'Sign Up';
        return 'Reset Password';
      }}
      getTabChild={(index) => {
        if (index === 0) return <SignIn />;
        if (index === 1) return <SignUp />;
        return <PasswordReset />;
      }}
    />
  );
};
