import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';

const AppRouterProvider: FC = (): ReactElement => {
  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
