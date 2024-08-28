import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';
import CreateUpdateContactForm from '../CreateUpdateContactForm/CreateUpdateContact.form';

const CreateContact: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <CreateUpdateContactForm mode="create" />
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default CreateContact;
