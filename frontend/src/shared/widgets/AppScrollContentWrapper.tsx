import { FC, PropsWithChildren, ReactElement } from 'react';

const AppScrollContentWrapper: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden">
      <div className="container mx-auto h-full px-4 md:px-6">
        <section className="w-full h-full flex flex-col flex-nowrap gap-4 overflow-hidden items-center justify-start p-4">{children}</section>
      </div>
    </div>
  );
};

export default AppScrollContentWrapper;
