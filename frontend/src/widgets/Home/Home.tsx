import { ERouterTitle } from '@/shared/router';
import AppPageTitle from '@/shared/widgets/AppPageTitle';
import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';

const Home: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <AppPageTitle title={ERouterTitle.HOME} />

        <div>Home</div>
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default Home;
