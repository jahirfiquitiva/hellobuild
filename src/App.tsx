import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { LoginPage, ReposPage, FavoritesPage, NotFoundPage } from '@/pages';
import { withAuth } from '@/components/Auth/';
import { withLayout } from '@/components/Layout';

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
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
