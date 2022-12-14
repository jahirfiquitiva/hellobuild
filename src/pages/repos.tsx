import { Profile } from '@/components/Profile';
import { Repositories } from '@/components/Repositories';
import type { FC } from 'react';

export const ReposPage: FC = () => {
  return (
    <>
      <Profile />
      <h2>Repositories</h2>
      <Repositories />
    </>
  );
};
