import { ERouter } from '@/shared/router';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, SortingState } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import { FC, ReactElement, useMemo, useState } from 'react';
import { Input } from '@/components/shadcn/ui/input';
import { Button } from '@/components/shadcn/ui/button';
import { Plus } from 'lucide-react';
import { contactsColumns } from './_ui/contactsColumns';
import AppTable from '@/shared/ui/AppTable/AppTable';
import { fetchAllContacts } from '@/entities/contacts/contacts.service';
import { Link } from 'react-router-dom';

const ContactsTable: FC = (): ReactElement => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<string>('');

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
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setColumnFilters,
    state: {
      sorting,
      globalFilter: columnFilters,
    },
  });

  const listLength = useMemo<number>(() => {
    return contactsQueryData ? contactsQueryData.length : 0;
  }, [contactsQueryData]);

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <div className="flex w-full items-end justify-between gap-6 flex-row">
        <Input
          onChange={(event) => setColumnFilters(event.target.value)}
          disabled={!contactsQueryData || !contactsQueryData.length}
          value={columnFilters}
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
