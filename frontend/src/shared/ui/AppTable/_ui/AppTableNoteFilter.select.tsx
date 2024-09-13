import { ReactElement } from 'react';
import { flexRender } from '@tanstack/react-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';
import { EContactTableColumnAccessorKeys } from '@/widgets/Contacts/_ui/contactsColumns';
import { ITableRowData } from '../_types/TableRowData.interface';

interface Props<TData> extends ITableRowData<TData> {
  setFilteredColumn: (value: EContactTableColumnAccessorKeys) => void;
}

const AppTableNoteFilterSelect = <TData,>(props: Props<TData>): ReactElement => {
  const { table, setFilteredColumn } = props;

  return (
    <Select
      onValueChange={(value) => setFilteredColumn(value as EContactTableColumnAccessorKeys)}
      defaultValue={EContactTableColumnAccessorKeys.CONTACT_LAST_NAME}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={'Set a filtered column'} title={'Set a filtered column'} />
      </SelectTrigger>

      <SelectContent>
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers
            .filter(
              (header) =>
                header.id === EContactTableColumnAccessorKeys.CONTACT_LAST_NAME || header.id === EContactTableColumnAccessorKeys.CONTACT_FIRST_NAME,
            )
            .map((header) => (
              <SelectItem key={header.id} value={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </SelectItem>
            )),
        )}
      </SelectContent>
    </Select>
  );
};

export default AppTableNoteFilterSelect;
