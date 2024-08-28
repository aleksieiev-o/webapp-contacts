import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';
import CreateUpdateContactForm from '../CreateUpdateContactForm/CreateUpdateContact.form';
import { ERouterTitle } from '@/shared/router';
import AppPageTitle from '@/shared/widgets/AppPageTitle';

const CreateContact: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <AppPageTitle title={ERouterTitle.CONTACTS_CREATE} />

        <CreateUpdateContactForm mode="create" />
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default CreateContact;
