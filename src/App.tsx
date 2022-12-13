import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginPage, ReposPage, FavoritesPage, NotFoundPage } from '@/pages';
import { authLoader, AuthProvider } from '@/providers';

import '@/styles/global.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <NotFoundPage />,
    loader: authLoader,
  },
  {
    path: 'repos',
    element: <ReposPage />,
    loader: authLoader,
  },
  {
    path: 'favorites',
    element: <FavoritesPage />,
    loader: authLoader,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
