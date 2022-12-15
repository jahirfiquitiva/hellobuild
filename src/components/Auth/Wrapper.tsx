import type { ReactNode } from 'react';
import { AuthProvider } from '@/providers';

export const withAuth = (children: ReactNode | ReactNode[] | null) => {
  return <AuthProvider>{children}</AuthProvider>;
};
