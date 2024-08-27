import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { FC, ReactElement } from 'react';

const UpdateContact: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <div>Update contact</div>
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default UpdateContact;
