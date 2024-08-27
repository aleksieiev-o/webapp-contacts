import { ReactElement } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ITableRowData } from './_types/TableRowData.interface';
import { Skeleton } from '@/components/shadcn/ui/skeleton';
import AppTableBody from './_ui/AppTableBody';
import AppTableHeader from './_ui/AppTableHeader';
import { Table } from '@/components/shadcn/ui/table';

interface Props<TData, TValue> extends ITableRowData<TData> {
  columns: ColumnDef<TData, TValue>[];
  isPending: boolean;
}

const AppTable = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const { table, columns, isPending } = props;

  return (
    <div className="rounded-md border overflow-auto">
      {isPending ? (
        <Skeleton className="h-[300px] w-full rounded-md border" />
      ) : (
        <Table>
          <AppTableHeader table={table} />

          <AppTableBody table={table} columns={columns} />
        </Table>
      )}
    </div>
  );
};

export default AppTable;
