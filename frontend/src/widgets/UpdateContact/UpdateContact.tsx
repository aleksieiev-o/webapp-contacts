import { fetchContactById } from '@/entities/contacts/contacts.service';
import AppScrollContentWrapper from '@/shared/widgets/AppScrollContentWrapper';
import AppWrapper from '@/shared/widgets/AppWrapper';
import { useQuery } from '@tanstack/react-query';
import { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import CreateUpdateContactForm from '../CreateUpdateContactForm/CreateUpdateContact.form';
import { ERouterTitle } from '@/shared/router';
import AppPageTitle from '@/shared/widgets/AppPageTitle';

const UpdateContact: FC = (): ReactElement => {
  const { id } = useParams();

  const { data: contactQueryData, isPending: contactIsPending } = useQuery({
    queryKey: [id],
    queryFn: async () => await fetchContactById(id!),
    staleTime: 5 * 1000,
  });

  return (
    <AppWrapper>
      <AppScrollContentWrapper>
        <AppPageTitle title={ERouterTitle.CONTACTS_UPDATE} />

        <CreateUpdateContactForm mode="update" contactQueryData={contactQueryData} contactIsPending={contactIsPending} />
      </AppScrollContentWrapper>
    </AppWrapper>
  );
};

export default UpdateContact;
