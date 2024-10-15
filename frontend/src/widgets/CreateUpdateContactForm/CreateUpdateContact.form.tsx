import { Form } from '@/components/shadcn/ui/form';
import { useToast } from '@/components/shadcn/ui/use-toast';
import { createContact, updateContact } from '@/entities/contacts/contacts.service';
import { useLoading } from '@/shared/hooks/useLoading';
import { ERouter } from '@/shared/router';
import { CreateContactDTO, IContact } from '@/shared/types/Contact';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, ReactElement, useEffect, useId, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PhonesListForm from './_widgets/PhonesList.form';
import { transformNullToUndefined } from '@/shared/utils/transformDatabaseValues';
import { createContactValidation } from './_validations/createContact.validation';

interface Props {
  mode: 'create' | 'update';
  contactQueryData?: IContact;
  contactIsPending?: boolean;
}

const CreateUpdateContactForm: FC<Props> = (props): ReactElement => {
  const { mode, contactQueryData } = props;
  const formID = useId();
  const { toast } = useToast();
  const { isLoading, setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const contactSchema = useMemo(() => z.object(createContactValidation), []);

  const formModel = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (mode === 'update' && contactQueryData) {
      const contactDTO: CreateContactDTO = {
        lastName: contactQueryData.lastName,
        firstName: contactQueryData.firstName,
        street: transformNullToUndefined(contactQueryData.street),
        houseNumber: transformNullToUndefined(contactQueryData.houseNumber),
        city: transformNullToUndefined(contactQueryData.city),
        postalCode: transformNullToUndefined(contactQueryData.postalCode),
        phones: contactQueryData.phones,
      };
      formModel.reset(contactDTO);
    }
  }, [contactQueryData, formModel, mode]);

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [ERouter.CONTACTS],
    });

    const description = mode === 'create' ? 'You have successfully created a new contact.' : 'You have successfully updated this contact.';
    toast({ title: 'Success', description });

    formModel.reset();
    navigate(ERouter.CONTACTS);
  };

  const onErrorCallback = async (): Promise<void> => {
    toast({
      title: 'Failure',
      description: 'An error occurred. Something went wrong.',
      variant: 'destructive',
    });
  };

  const onSettledCallback = async (): Promise<void> => {
    setIsLoading(false);
  };

  const createContactData = (values: CreateContactDTO): CreateContactDTO => ({
    lastName: values.lastName,
    firstName: values.firstName,
    street: values.street,
    houseNumber: values.houseNumber,
    city: values.city,
    postalCode: values.postalCode,
    phones: values.phones,
  });

  const mutationCreateOrUpdate = useMutation({
    mutationFn: async (values: CreateContactDTO) =>
      mode === 'create' ? await createContact(createContactData(values)) : await updateContact(id!, createContactData(values)),

    onSuccess: async () => {
      await onSuccessCallback();
    },
    onError: async (error, variables) => {
      await onErrorCallback();
      console.warn(error, variables);
    },
    onSettled: async () => {
      await onSettledCallback();
    },
  });

  const handleSubmitForm = (values: z.infer<typeof contactSchema>) => {
    setIsLoading(true);
    mutationCreateOrUpdate.mutate(values);
  };

  return (
    <section className="w-full flex flex-col items-start justify-start gap-4">
      <GoToPreviousPageButton href={ERouter.CONTACTS} />

      <Form {...formModel}>
        <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={formID} className={'flex w-full flex-col items-start justify-center gap-4'}>
          <AppFormInputText
            mode={'input'}
            type={'text'}
            formModel={formModel}
            name={'firstName'}
            label={'First name'}
            placeholder={'Enter a first name'}
            required={true}
            disabled={isLoading}
            isDataPending={isLoading}
          />

          <AppFormInputText
            mode={'input'}
            type={'text'}
            formModel={formModel}
            name={'lastName'}
            label={'Last name'}
            placeholder={'Enter a last name'}
            required={true}
            disabled={isLoading}
            isDataPending={isLoading}
          />

          <AppFormInputText
            mode={'input'}
            type={'text'}
            formModel={formModel}
            name={'street'}
            label={'Street'}
            placeholder={'Enter a street'}
            required={false}
            disabled={isLoading}
            isDataPending={isLoading}
          />

          <AppFormInputText
            mode={'input'}
            type={'text'}
            formModel={formModel}
            name={'houseNumber'}
            label={'House number'}
            placeholder={'Enter a house number'}
            required={false}
            disabled={isLoading}
            isDataPending={isLoading}
          />

          <AppFormInputText
            mode={'input'}
            type={'text'}
            formModel={formModel}
            name={'city'}
            label={'City'}
            placeholder={'Enter a city'}
            required={false}
            disabled={isLoading}
            isDataPending={isLoading}
          />

          <AppFormInputText
            mode={'input'}
            type={'text'}
            formModel={formModel}
            name={'postalCode'}
            label={'Postal code'}
            placeholder={'Enter a postal code'}
            required={false}
            disabled={isLoading}
            isDataPending={isLoading}
          />

          <PhonesListForm formModel={formModel} />
        </form>
      </Form>

      <div className={'flex w-full flex-row items-center justify-start gap-4'}>
        <SubmitButton
          formId={formID}
          title={mode === 'create' ? 'Create contact' : 'Update contact'}
          btnBody={mode === 'create' ? 'Create' : 'Update'}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
    </section>
  );
};

export default CreateUpdateContactForm;
