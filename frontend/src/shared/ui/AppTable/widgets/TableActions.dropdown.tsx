import { FC, ReactElement } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/shadcn/ui/dropdown-menu';
import { Button } from '@/components/shadcn/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ERouter } from '@/shared/router';

interface Props {
  updateLink: ERouter;
  handlePrepareRemove: () => void;
}

const TableActionsDropdown: FC<Props> = (props): ReactElement => {
  const { updateLink, handlePrepareRemove } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={'Open context menu'}>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        <Link to={updateLink}>
          <DropdownMenuItem className={'flex flex-row items-center justify-start gap-4'}>
            <Pencil className={'h-4 w-4'} />
            Update
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem onClick={handlePrepareRemove} className={'flex flex-row items-center justify-start gap-4'}>
          <Trash className={'h-4 w-4'} />
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionsDropdown;
