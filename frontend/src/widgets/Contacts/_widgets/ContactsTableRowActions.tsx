import { ReactElement, useMemo, useState } from 'react';
import { Row } from '@tanstack/react-table';
import TableActionsDropdown from '@/shared/ui/AppTable/widgets/TableActions.dropdown';
import ContactDetailsDialog from '../_ui/ContactDetails.dialog';
import { ERouter } from '@/shared/router';
import { IContact } from '@/shared/types/Contact';
import RemoveConfirmContactDialog from '@/features/RemoveConfirmContact.dialog';

interface Props<TData> {
  row: Row<TData>;
}

const ContactsTableRowActions = <TData,>(props: Props<TData>): ReactElement => {
  const { row } = props;
  const [dialogContactsDetailsIsOpen, setDialogContactsDetailsIsOpen] = useState<boolean>(false);
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);

  const contactData = row.original as IContact;

  const updateContactLink = useMemo(() => {
    const pathname = ERouter.CONTACTS_UPDATE.split(':')[0];
    return `${pathname}${contactData.id}`;
  }, [contactData.id]);

  const handlePrepareRemove = () => {
    setDialogRemoveIsOpen(true);
  };

  return (
    <section className="flex md:flex-row flex-col md:items-center items-start justify-end md:gap-6 gap-4">
      <ContactDetailsDialog row={row} dialogIsOpen={dialogContactsDetailsIsOpen} setDialogIsOpen={setDialogContactsDetailsIsOpen} />

      <TableActionsDropdown updateLink={updateContactLink} handlePrepareRemove={handlePrepareRemove} />

      <RemoveConfirmContactDialog setDialogIsOpen={setDialogRemoveIsOpen} dialogIsOpen={dialogRemoveIsOpen} contact={contactData} />
    </section>
  );
};

export default ContactsTableRowActions;
