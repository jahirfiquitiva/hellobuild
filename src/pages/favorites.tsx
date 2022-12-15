import { Profile } from '@/components/Profile';
import { Repositories } from '@/components/Repositories';
import { GitHubProvider, useGitHub } from '@/providers';
import type { FC } from 'react';

const Favorites = () => {
  const { loading } = useGitHub();
  if (loading) return null;
  return (
    <>
      <Profile infoOnly />
      <Repositories isFavoritesList />
    </>
  );
};

export const FavoritesPage: FC = () => {
  return (
    <GitHubProvider>
      <Favorites />
    </GitHubProvider>
  );
};
