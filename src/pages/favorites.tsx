import { Profile } from '@/components/Profile';
import { Repositories } from '@/components/Repositories';
import { useGitHub } from '@/providers';
import type { FC } from 'react';

export const FavoritesPage: FC = () => {
  const { token: githubToken, loading } = useGitHub();
  if (loading) return null;
  if (!githubToken) return <Profile infoOnly />;
  return <Repositories isFavoritesList />;
};
