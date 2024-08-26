import { ReactElement } from 'react';
import { flexRender } from '@tanstack/react-table';
import { TableHeader, TableRow, TableHead } from '@/components/shadcn/ui/table';
import { ITableRowData } from '../_types/TableRowData.interface';

const AppTableHeader = <TData,>(props: ITableRowData<TData>): ReactElement => {
  const { table } = props;

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default AppTableHeader;
