import {FC, ReactElement} from 'react';

const AppHeader: FC = (): ReactElement => {
  return (
    <header className={'flex w-full flex-row items-center justify-between gap-4 overflow-hidden p-4 shadow-md'}>
      <span className={'text-2xl font-bold'}>WebApp Contacts</span>

      <div className={'grid auto-cols-max grid-flow-col items-center gap-4 md:gap-6'}></div>
    </header>
  );
};

export default AppHeader;
