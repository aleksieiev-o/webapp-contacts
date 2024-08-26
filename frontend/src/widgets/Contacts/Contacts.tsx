import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';
import ContactsTable from './ContactsTable';

const Contacts: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <ContactsTable />
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default Contacts;
