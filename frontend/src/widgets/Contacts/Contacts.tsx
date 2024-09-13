import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';
import ContactsTable from './ContactsTable';
import AppPageTitle from '@/shared/widgets/AppPageTitle';
import { ERouterTitle } from '@/shared/router';

const Contacts: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <AppPageTitle title={ERouterTitle.CONTACTS} />

        <ContactsTable />
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default Contacts;
