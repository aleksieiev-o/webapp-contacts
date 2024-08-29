import { Button } from '@/components/shadcn/ui/button';
import { ERouter, ERouterTitle } from '@/shared/router';
import AppPageTitle from '@/shared/widgets/AppPageTitle';
import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <AppPageTitle title={ERouterTitle.HOME} />

        <Link to={ERouter.CONTACTS}>
          <Button variant="default" title="Contacts">
            Contacts
          </Button>
        </Link>
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default Home;
