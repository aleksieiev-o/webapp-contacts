import { ReactElement } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ITableRowData } from './_types/TableRowData.interface';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import AppTableBody from './_ui/AppTableBody';
import AppTableHeader from './_ui/AppTableHeader';
import { Table } from '@/components/shadcn/ui/table';
import { cn } from '@/lib/utils';

interface Props<TData, TValue> extends ITableRowData<TData> {
  columns: ColumnDef<TData, TValue>[];
  isPending: boolean;
  isSuccess: boolean;
  listLength: number;
}

const AppTable = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const { table, columns, isPending, isSuccess, listLength } = props;

  return (
    <div className={cn(isSuccess && listLength > 0 ? 'rounded-md border overflow-auto' : '')}>
      {isPending ? (
        <Skeleton className="h-[300px] w-full rounded-md border" />
      ) : (
        <>
          {isSuccess && listLength > 0 ? (
            <Table>
              <AppTableHeader table={table} />

              <AppTableBody table={table} columns={columns} />
            </Table>
          ) : (
            <p className="text-center">Contacts list is empty</p>
          )}
        </>
      )}
    </div>
  );
};

export default AppTable;
