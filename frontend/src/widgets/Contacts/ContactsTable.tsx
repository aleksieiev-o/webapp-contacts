import { ERouter } from '@/shared/router';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FC, ReactElement, useMemo, useState } from 'react';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from '@/components/shadcn/ui/button';
import { Plus } from 'lucide-react';
import { contactsColumns, EContactTableColumnAccessorKeys } from './_ui/contactsColumns';
import AppTable from '@/shared/ui/AppTable/AppTable';
import { fetchAllContacts } from '@/entities/contacts/contacts.service';
import { Link } from 'react-router-dom';

const ContactsTable: FC = (): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const {
    data: contactsQueryData,
    isPending: contactsIsPending,
    isSuccess: contactsIsSuccess,
  } = useQuery({
    queryKey: [ERouter.CONTACTS],
    queryFn: async () => await fetchAllContacts(),
    staleTime: 5 * 1000,
  });

  const table = useReactTable({
    data: contactsIsSuccess ? contactsQueryData : [],
    columns: contactsColumns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const listLength = useMemo<number>(() => {
    return contactsQueryData ? contactsQueryData.length : 0;
  }, [contactsQueryData]);

  const customTableFilter = (event: ChangeEvent<HTMLInputElement>) => {
    return table.getColumn(EContactTableColumnAccessorKeys.CONTACT_LAST_NAME)?.setFilterValue(event.target.value);
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <div className="flex w-full items-end justify-between gap-6 flex-row">
        <Input
          onChange={(event) => customTableFilter(event)}
          disabled={!contactsQueryData || !contactsQueryData.length}
          value={(table.getColumn(EContactTableColumnAccessorKeys.CONTACT_LAST_NAME)?.getFilterValue() as string) ?? ''}
          placeholder="Contacts filter"
          title="Contacts filter"
          className="h-12 w-full"
        />

        <Link to={ERouter.CONTACTS_CREATE}>
          <Button variant="default" className="gap-4" title="Create contact">
            <Plus className="h-5 w-5" />
            <span className="md:inline hidden">Create</span>
          </Button>
        </Link>
      </div>

      <AppTable table={table} columns={contactsColumns} isPending={contactsIsPending} isSuccess={contactsIsSuccess} listLength={listLength} />
    </div>
  );
};

export default ContactsTable;
