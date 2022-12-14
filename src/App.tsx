import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider } from '@apollo/client';

import { LoginPage, ReposPage, FavoritesPage, NotFoundPage } from '@/pages';
import { withLayout } from '@/components/Layout';
import { apolloClient } from '@/lib/apollo';

import '@/styles/global.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: withLayout(<LoginPage />),
    errorElement: withLayout(<NotFoundPage />),
  },
  {
    path: '/profile',
    element: withLayout(<ReposPage />),
  },
  {
    path: '/favorites',
    element: withLayout(<FavoritesPage />),
  },
]);

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
      <Toaster />
    </ApolloProvider>
  );
}

export default App;
