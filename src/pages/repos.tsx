import type { FC } from 'react';

import { Profile } from '@/components/Profile';
import { Repositories } from '@/components/Repositories';
import { GitHubProvider } from '@/providers';

export const ReposPage: FC = () => {
  return (
    <GitHubProvider>
      <Profile />
      <Repositories />
    </GitHubProvider>
  );
};
