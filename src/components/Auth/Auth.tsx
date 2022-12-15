import { Tabs } from '@/components/Tabs';
import { useAuth } from '@/providers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordReset } from './PasswordReset';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) navigate('/profile');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

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
