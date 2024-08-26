import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import {FC, ReactElement} from 'react';

const Contacts: FC = (): ReactElement => {
  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <div>Contacts</div>
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default Contacts;
