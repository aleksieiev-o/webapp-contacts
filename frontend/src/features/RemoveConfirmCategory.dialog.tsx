import { FC, ReactElement } from 'react';
import { useToast } from '@/components/shadcn/ui/use-toast';
import { useLoading } from '@/shared/hooks/useLoading';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import { ERouter } from '@/shared/router';
import { IContact } from '@/shared/types/Contact';
import { removeContactById } from '@/entities/contacts/contacts.service';
import { AxiosResponseExceptionData } from '@/shared/types/Exceptions';

interface Props {
  contact: IContact;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveConfirmContactDialog: FC<Props> = (props): ReactElement => {
  const { contact, dialogIsOpen, setDialogIsOpen } = props;
  const { toast } = useToast();
  const { isLoading, setIsLoading } = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [ERouter.CONTACTS],
    });

    toast({
      title: 'Success',
      description: 'The contact has successfully removed.',
    });
  };

  const onErrorCallback = async (error: AxiosResponseExceptionData): Promise<void> => {
    toast({
      title: 'Failure',
      description: (
        <div className="flex flex-col items-start justify-start gap-2">
          <p>
            Status: <strong>{error.status}</strong>
          </p>
          <p>An error occurred. {error.message}</p>
        </div>
      ),
      variant: 'destructive',
    });
  };

  const onSettledCallback = async (): Promise<void> => {
    setIsLoading(false);
    setDialogIsOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async (id: string) => await removeContactById(id),
    onSuccess: async () => {
      await onSuccessCallback();
    },
    onError: async (error: AxiosResponseExceptionData, variables) => {
      await onErrorCallback(error);
      console.warn(error, variables);
    },
    onSettled: async () => {
      await onSettledCallback();
    },
  });

  const handleConfirm = () => {
    setIsLoading(true);
    mutation.mutate(contact.id);
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove contact confirmation'}
      dialogDescription={'You are about to remove this contact.'}
      dialogQuestion={'Are you sure you want to delete this contact?'}
      btnTitle={'Remove contact'}
      btnBody={'Remove'}
    />
  );
};

export default RemoveConfirmContactDialog;
