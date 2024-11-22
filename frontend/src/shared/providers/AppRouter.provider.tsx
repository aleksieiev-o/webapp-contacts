import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router';

const AppRouterProvider: FC = (): ReactElement => {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};

export default AppRouterProvider;
