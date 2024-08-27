import { ReactElement, useState } from 'react';
import { Row } from '@tanstack/react-table';
import TableActionsDropdown from '@/shared/ui/AppTable/widgets/TableActions.dropdown';
import ContactDetailsDialog from '../_ui/ContactDetails.dialog';
import { ERouter } from '@/shared/router';

interface Props<TData> {
  row: Row<TData>;
}

const ContactsTableRowActions = <TData,>(props: Props<TData>): ReactElement => {
  const { row } = props;
  const [, setDialogRemoveIsOpen] = useState<boolean>(false);
  const [dialogContactsDetailsIsOpen, setDialogContactsDetailsIsOpen] = useState<boolean>(false);

  const handlePrepareDelete = () => {
    setDialogRemoveIsOpen(true);
  };

  return (
    <section className="flex md:flex-row flex-col md:items-center items-start md:justify-center justify-start md:gap-6 gap-4">
      <ContactDetailsDialog row={row} dialogIsOpen={dialogContactsDetailsIsOpen} setDialogIsOpen={setDialogContactsDetailsIsOpen} />

      <TableActionsDropdown updateLink={ERouter.CONTACTS_UPDATE} handlePrepareDelete={handlePrepareDelete} />
    </section>
  );
};

export default ContactsTableRowActions;
