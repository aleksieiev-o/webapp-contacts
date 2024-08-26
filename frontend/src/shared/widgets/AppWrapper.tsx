import {Toaster} from '@/components/shadcn/ui/toaster';
import {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from './AppHeader';

const AppWrapper: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <div className={'h-full w-full overflow-hidden'}>
      <section className={'flex h-full w-full flex-col items-start justify-start gap-4 md:gap-6'}>
        <AppHeader />

        {children}
      </section>

      <Toaster />
    </div>
  );
};

export default AppWrapper;
