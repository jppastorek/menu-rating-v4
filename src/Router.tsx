import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import Shell from './components/Shell';
import { RestaurantPage } from './pages/RestaurantPage';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search/item/:item',
        element: <HomePage />,
      },
      {
        path: '/restaurants',
        element: <RestaurantPage />,
      },
      {
        path: '/account',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/signup',
        element: <SignUpForm />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
