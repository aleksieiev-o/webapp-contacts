import { FC, PropsWithChildren, ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ERouter } from '@/shared/router/index';

interface Props extends PropsWithChildren {
  isAllowed: boolean;
  redirectedPath: ERouter;
}

const ProtectedRoute: FC<Props> = (props): ReactElement => {
  const { isAllowed, redirectedPath, children } = props;

  if (!isAllowed) {
    return <Navigate to={redirectedPath} replace={true} />;
  }

  return children ? (children as ReactElement) : <Outlet />;
};

export default ProtectedRoute;
