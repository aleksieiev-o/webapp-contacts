import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';
import CreateContactForm from './CreateContact.form';

const CreateContact: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <CreateContactForm />
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default CreateContact;
