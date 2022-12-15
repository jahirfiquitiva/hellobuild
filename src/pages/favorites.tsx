import { Profile } from '@/components/Profile';
import { Repositories } from '@/components/Repositories';
import { useGitHubAuth } from '@/hooks/useGitHubAuth';
import { useAuth } from '@/providers';
import type { FC } from 'react';

export const FavoritesPage: FC = () => {
  const { user, loading: userLoading } = useAuth();
  const { token: githubToken, loading } = useGitHubAuth(user?.githubToken);
  if (userLoading || loading) return null;
  if (!githubToken) {
    return <Profile infoOnly />;
  }
  return <Repositories isFavoritesList />;
};
