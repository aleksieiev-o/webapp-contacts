import { Form } from '@/components/shadcn/ui/form';
import { useToast } from '@/components/shadcn/ui/use-toast';
import { createContact } from '@/entities/contacts/contacts.service';
import { useLoading } from '@/shared/hooks/useLoading';
import { ERouter } from '@/shared/router';
import { CreateContactDTO } from '@/shared/types/Contact';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC, ReactElement, useId, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PhonesListForm from './_widgets/PhonesList.form';
import { CreatePhoneDTO } from '@/shared/types/Phone';

const CreateContactForm: FC = (): ReactElement => {
  const formID = useId();
  const { toast } = useToast();
  const { isLoading, setIsLoading } = useLoading();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const phoneSchema = useMemo(
    () =>
      z.object({
        phone: z
          .string({
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .max(100, 'Value must not exceed 100 characters'),
      }),
    [],
  );

  const contactSchema = useMemo(
    () =>
      z.object({
        lastName: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(3, 'Value must be at least 3 characters')
          .max(100, 'Value must not exceed 100 characters'),
        firstName: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(3, 'Value must be at least 3 characters')
          .max(100, 'Value must not exceed 100 characters'),
        street: z.optional(
          z
            .string({
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .max(255, 'Value must not exceed 255 characters'),
        ),
        houseNumber: z.optional(
          z
            .string({
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .max(50, 'Value must not exceed 50 characters'),
        ),
        city: z.optional(
          z
            .string({
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .max(100, 'Value must not exceed 100 characters'),
        ),
        postalCode: z.optional(
          z
            .string({
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .max(5, 'Value must not exceed 5 characters'),
        ),
        phones: z.array(phoneSchema).min(1, 'List must contain at least 1 value'),
      }),
    [phoneSchema],
  );

  const formModel = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [ERouter.CONTACTS],
    });

    const description = 'You have successfully created a new contact.';
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
    mutationFn: async (values: CreateContactDTO) => await createContact(createContactData(values)),
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

  const updatePhonesList = (list: CreatePhoneDTO[]) => {
    formModel.setValue<'phones'>('phones', list);
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

          <PhonesListForm formModelControl={formModel.control} updatePhonesList={updatePhonesList} />
        </form>
      </Form>

      <div className={'flex w-full flex-row items-center justify-start gap-4'}>
        <SubmitButton formId={formID} title={'Create'} btnBody={'Create'} isLoading={isLoading} disabled={isLoading} />
      </div>
    </section>
  );
};

export default CreateContactForm;
