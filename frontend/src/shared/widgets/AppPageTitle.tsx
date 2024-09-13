import { FC, ReactElement } from 'react';
import { ERouterTitle } from '../router';

interface Props {
  title: ERouterTitle;
}

const AppPageTitle: FC<Props> = (props): ReactElement => {
  const { title } = props;

  return (
    <section className="flex w-full flex-row items-center justify-between gap-4 overflow-hidden">
      <h1 className="text-3xl font-bold">{title}</h1>
    </section>
  );
};

export default AppPageTitle;
