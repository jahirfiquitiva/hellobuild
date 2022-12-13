import { Tabs } from '@/components/Tabs';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const Auth = () => {
  return (
    <Tabs
      tabsCount={2}
      getTabTitle={(index) => {
        return index === 0 ? 'Sign In' : 'Sign Up';
      }}
      getTabChild={(index) => {
        return index === 0 ? <SignIn /> : <SignUp />;
      }}
      initialTab={1}
    />
  );
};
