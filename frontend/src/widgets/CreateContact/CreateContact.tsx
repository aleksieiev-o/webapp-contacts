import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';

const CreateContact: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <div>Create contact</div>
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default CreateContact;
