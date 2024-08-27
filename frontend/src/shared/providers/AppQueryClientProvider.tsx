import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactElement, PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const AppQueryClientProvider: FC<PropsWithChildren<unknown>> = ({ children }): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppQueryClientProvider;
