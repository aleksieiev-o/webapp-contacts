import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ERouter } from '../router';

const AppHeader: FC = (): ReactElement => {
  return (
    <header className="flex w-full flex-row items-center justify-between gap-4 p-4 shadow-md">
      <Link to={ERouter.HOME}>
        <span className="text-2xl font-bold">WebApp Contacts</span>
      </Link>

      <div className="grid auto-cols-max grid-flow-col items-center gap-4 md:gap-6"></div>
    </header>
  );
};

export default AppHeader;
