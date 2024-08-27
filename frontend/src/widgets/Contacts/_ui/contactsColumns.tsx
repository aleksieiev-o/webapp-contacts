import { IContact } from '@/shared/types/Contact';
import { IPhone } from '@/shared/types/Phone';
import TableColumnHeaderWithSort from '@/shared/ui/AppTable/widgets/TableColumnHeaderWithSort';
import { createColumnHelper, Row } from '@tanstack/react-table';
import ContactsTableRowActions from '../_widgets/ContactsTableRowActions';
import { ScrollArea } from '@/components/shadcn/ui/scroll-area';
import { Separator } from '@/components/shadcn/ui/separator';
import { cn } from '@/lib/utils';

export enum EContactTableColumnAccessorKeys {
  CONTACT_ID = 'id',
  CONTACT_FIRST_NAME = 'firstName',
  CONTACT_LAST_NAME = 'lastName',
  CONTACT_PHONES = 'phones',
}

type TRow = Row<Omit<IContact, 'street' | 'houseNumber' | 'city' | 'postalCode'>>;

const columnHelper = createColumnHelper<Omit<IContact, 'street' | 'houseNumber' | 'city' | 'postalCode'>>();

const getPhones = (row: TRow) => row.getValue<IPhone[]>(EContactTableColumnAccessorKeys.CONTACT_PHONES);

export const contactsColumns = [
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_ID, {
    header: () => <div className="text-start font-bold">ID</div>,
    cell: ({ row }) => (
      <div className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {row.getValue(EContactTableColumnAccessorKeys.CONTACT_ID)}
      </div>
    ),
  }),
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_FIRST_NAME, {
    header: ({ column }) => <TableColumnHeaderWithSort columnName={'Firs name'} menuName={'Contacts sort'} column={column} />,
    cell: ({ row }) => (
      <div className="md:max-w-40 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {row.getValue(EContactTableColumnAccessorKeys.CONTACT_FIRST_NAME)}
      </div>
    ),
  }),
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_LAST_NAME, {
    header: ({ column }) => <TableColumnHeaderWithSort columnName={'Last name'} menuName={'Contacts sort'} column={column} />,
    cell: ({ row }) => (
      <div className="md:max-w-40 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-start">
        {row.getValue(EContactTableColumnAccessorKeys.CONTACT_LAST_NAME)}
      </div>
    ),
  }),
  columnHelper.accessor(EContactTableColumnAccessorKeys.CONTACT_PHONES, {
    header: () => <div className="whitespace-nowrap text-start">Phones</div>,
    cell: ({ row }) => (
      <>
        {getPhones(row).length > 0 ? (
          <ScrollArea className={cn(getPhones(row).length > 1 ? 'h-[70px]' : '', 'rounded-md')}>
            <>
              {getPhones(row).map((item, _idx, arr) => (
                <div key={item.id}>
                  <div className="md:max-w-40 max-w-28 overflow-hidden text-ellipsis whitespace-nowrap text-start">{item.phone}</div>

                  {arr.length > 1 && <Separator className="my-2" />}
                </div>
              ))}
            </>
          </ScrollArea>
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
