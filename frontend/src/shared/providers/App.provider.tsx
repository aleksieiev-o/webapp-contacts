import { FC, ReactElement } from 'react';
import AppRouterProvider from './AppRouter.provider';
import AppQueryClientProvider from './AppQueryClientProvider';

const AppProvider: FC = (): ReactElement => {
  return (
    <AppQueryClientProvider>
      <AppRouterProvider />
    </AppQueryClientProvider>
  );
};

export default AppProvider;
