import {FC, ReactElement, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import {ERouter, ERouterTitle} from '../router';

const AppPageTitle: FC = (): ReactElement => {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    return (
      {
        [ERouter.HOME]: ERouterTitle.HOME,
        [ERouter.CONTACTS]: ERouterTitle.CONTACTS,
        [ERouter.NOT_FOUND]: ERouterTitle.NOT_FOUND,
      }[location.pathname] || 'Page title'
    );
  }, [location.pathname]);

  return (
    <section className={'flex w-full flex-row items-center justify-between gap-4 overflow-hidden'}>
      <h1 className={'text-3xl font-bold'}>{pageTitle}</h1>
    </section>
  );
};

export default AppPageTitle;
