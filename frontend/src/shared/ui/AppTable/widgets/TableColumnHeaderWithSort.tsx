import { ReactElement } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/shadcn/ui/dropdown-menu';
import { Button } from '@/components/shadcn/ui/button';
import { ArrowDownAZ, ArrowUpAZ, ArrowUpDown } from 'lucide-react';
import { Column } from '@tanstack/react-table';

interface Props<TData, TValue> {
  columnName: string;
  menuName: string;
  column: Column<TData, TValue>;
}

const TableColumnHeaderWithSort = <TData, TValue>(props: Props<TData, TValue>): ReactElement => {
  const { columnName, menuName, column } = props;

  const handleAscSort = () => {
    column.toggleSorting(false);
  };

  const handleDescSort = () => {
    column.toggleSorting(true);
  };

  return (
    <div className="flex items-center whitespace-nowrap text-start font-bold">
      <div className="mr-2">{columnName}</div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className={'h-8 w-8 p-0'} title={'Open sort menu'}>
            <span className="sr-only">Open sort menu</span>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{menuName}</DropdownMenuLabel>

          <DropdownMenuItem onClick={handleAscSort} className={'flex flex-row items-center justify-start gap-4'}>
            <ArrowUpAZ className={'h-4 w-4'} />A - Z
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDescSort} className={'flex flex-row items-center justify-start gap-4'}>
            <ArrowDownAZ className={'h-4 w-4'} />Z - A
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableColumnHeaderWithSort;
