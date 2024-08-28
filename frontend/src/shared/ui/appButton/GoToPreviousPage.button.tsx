import { FC, ReactElement } from 'react';
import { Button } from '@/components/shadcn/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ERouter } from '@/shared/router';

interface Props {
  href: ERouter;
}

const GoToPreviousPageButton: FC<Props> = (props): ReactElement => {
  const { href } = props;
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(href)} variant={'ghost'} title={'Back'}>
      <ChevronLeft className={'mr-4 h-5 w-5'} />
      <p>Back</p>
    </Button>
  );
};

export default GoToPreviousPageButton;
