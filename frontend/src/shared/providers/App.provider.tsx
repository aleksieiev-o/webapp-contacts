import {FC, ReactElement} from 'react';
import AppRouterProvider from './AppRouter.provider';

const AppProvider: FC = (): ReactElement => {
  return <AppRouterProvider />;
};

export default AppProvider;
