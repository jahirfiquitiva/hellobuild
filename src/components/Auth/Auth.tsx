import { Tabs } from '@/components/Tabs';
import { PasswordReset } from './PasswordReset';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const Auth = () => {
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
