import { IContact } from '@/shared/types/Contact';
import { IPhone } from '@/shared/types/Phone';
import TableColumnHeaderWithSort from '@/shared/ui/AppTable/widgets/TableColumnHeaderWithSort';
import { createColumnHelper, Row } from '@tanstack/react-table';
import ContactsTableRowActions from '../_widgets/ContactsTableRowActions';
import { ScrollArea } from '@/components/shadcn/ui/scroll-area';
import { Separator } from '@/components/shadcn/ui/separator';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/shadcn/ui/badge';
import { ReactElement } from 'react';

export enum EContactTableColumnAccessorKeys {
  CONTACT_ID = 'id',
  CONTACT_FIRST_NAME = 'firstName',
  CONTACT_LAST_NAME = 'lastName',
  CONTACT_PHONES = 'phones',
}

type TRow = Row<Omit<IContact, 'street' | 'houseNumber' | 'city' | 'postalCode'>>;

const columnHelper = createColumnHelper<Omit<IContact, 'street' | 'houseNumber' | 'city' | 'postalCode'>>();

const getPhones = (row: TRow) => row.getValue<IPhone[]>(EContactTableColumnAccessorKeys.CONTACT_PHONES);

const showContactID = (id: string): ReactElement => {
  return (
    <div className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-start" title={`Full ID: ${id}`}>
      {id.slice(0, 8)}
    </div>
  );
};

const showContactPhonesNumber = (value: number): ReactElement => {
  return (
    <Badge variant="default" className="flex rounded-full p-0 m-0 items-center justify-center w-7 h-7" title="Number of contact phones">
      {value > 9 ? '9+' : `${value}`}
    </Badge>
  );
};

export const contactsColumns = [
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_ID, {
    header: () => <div className="text-start font-bold">ID</div>,
    cell: ({ row }) => showContactID(row.getValue(EContactTableColumnAccessorKeys.CONTACT_ID)),
    enableGlobalFilter: false,
  }),
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_FIRST_NAME, {
    header: ({ column }) => <TableColumnHeaderWithSort columnName={'Firs name'} menuName={'Contacts sort'} column={column} />,
    cell: ({ row }) => (
      <div className="md:max-w-40 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {row.getValue(EContactTableColumnAccessorKeys.CONTACT_FIRST_NAME)}
      </div>
    ),
    enableGlobalFilter: true,
  }),
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_LAST_NAME, {
    header: ({ column }) => <TableColumnHeaderWithSort columnName={'Last name'} menuName={'Contacts sort'} column={column} />,
    cell: ({ row }) => (
      <div className="md:max-w-40 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {row.getValue(EContactTableColumnAccessorKeys.CONTACT_LAST_NAME)}
      </div>
    ),
    enableGlobalFilter: true,
  }),
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_PHONES, {
    header: () => <div className="whitespace-nowrap text-start font-bold">Phones</div>,
    cell: ({ row }) => (
      <>
        {getPhones(row).length > 0 ? (
          <div className="flex flex-row items-center justify-start gap-4 overflow-hidden">
            {showContactPhonesNumber(getPhones(row).length)}

            <ScrollArea className={cn(getPhones(row).length > 1 ? 'h-[70px]' : '', 'rounded-md')}>
              <>
                {getPhones(row).map((item, _idx, arr) => (
                  <div key={item.id} className="pr-3">
                    <p className="md:w-40 w-28 text-ellipsis whitespace-nowrap text-start overflow-hidden" title={item.phone}>
                      {item.phone}
                    </p>
                    {arr.length > 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </>
            </ScrollArea>
          </div>
        ) : (
          <span>Phones list is empty</span>
        )}
      </>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <ContactsTableRowActions row={row} />,
  }),
];
