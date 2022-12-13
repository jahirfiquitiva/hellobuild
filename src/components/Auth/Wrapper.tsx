import { AuthProvider } from '@/providers';
import type { ComponentChild } from '@/types/fc';

export const withAuth = (children: ComponentChild) => {
  return <AuthProvider>{children}</AuthProvider>;
};
