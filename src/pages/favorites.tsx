import { Profile } from '@/components/Profile';
import { Repositories } from '@/components/Repositories';
import { GitHubProvider, useGitHub } from '@/providers';
import type { FC } from 'react';

const Favorites = () => {
  const { token: githubToken, loading } = useGitHub();
  if (loading) return null;
  if (!githubToken) return <Profile infoOnly />;
  return <Repositories isFavoritesList />;
};

export const FavoritesPage: FC = () => {
  return (
    <GitHubProvider>
      <Favorites />
    </GitHubProvider>
  );
};
