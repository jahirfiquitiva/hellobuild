import { Profile } from '@/components/Profile';
import { Repositories } from '@/components/Repositories';
import { GitHubProvider } from '@/providers';
import type { FC } from 'react';

export const ReposPage: FC = () => {
  return (
    <GitHubProvider>
      <Profile />
      <Repositories />
    </GitHubProvider>
  );
};
