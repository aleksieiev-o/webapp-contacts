import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import { CreateContactDTO } from '@/shared/types/Contact';
import { CreatePhoneDTO } from '@/shared/types/Phone';
import AppInputText from '@/shared/ui/appInput/AppInpt.text';
import { Plus, X } from 'lucide-react';
import { FC, ReactElement, useMemo, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';
import { z, ZodError, ZodIssueCode } from 'zod';

interface Props {
  formModelControl: Control<CreateContactDTO>;
  updatePhonesList: (list: CreatePhoneDTO[]) => void;
}

const PhonesListForm: FC<Props> = (props): ReactElement => {
  const { formModelControl, updatePhonesList } = props;
  const [phoneValue, setPhoneValue] = useState<CreatePhoneDTO | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const phonesList = useWatch({
    control: formModelControl,
    name: 'phones',
    defaultValue: [],
  });

  const handleOnChange = (value: string) => {
    setPhoneValue({ phone: value });
  };

  const phoneSchemaExtended = useMemo(
    () =>
      z
        .object({
          phone: z
            .string({
              required_error: 'Field is required',
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .min(4, 'Value must be at least 4 characters')
            .max(100, 'Value must not exceed 100 characters'),
        })
        .superRefine((data, ctx) => {
          if (phonesList && phonesList.filter((item) => item.phone === data.phone).length > 0) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              path: ['phones'],
              message: 'This value is already exist in the list',
            });
          }
        }),
    [phonesList],
  );

  const addItemToPhonesList = (values: z.infer<typeof phoneSchemaExtended>) => {
    setErrorMessage('');

    try {
      const phone = phoneSchemaExtended.parse(values);

      if (phonesList) {
        updatePhonesList([...phonesList, phone]);
      } else {
        updatePhonesList([phone]);
      }

      handleOnChange('');
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setErrorMessage(err.issues.length ? err.issues[0].message : '');
      }
    }
  };

  const removeItemFromPhonesList = (payload: string) => {
    updatePhonesList([...phonesList.filter((item) => payload !== item.phone)]);
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row flex-nowrap items-end justify-start gap-4">
        <AppInputText
          handleOnChange={handleOnChange}
          value={phoneValue?.phone || ''}
          mode={'input'}
          type={'text'}
          label={'Phone'}
          placeholder={'Enter a phone'}
          required={true}
          disabled={false}
          isDataPending={false}
          errorMessage={errorMessage}
        />

        <Button
          onClick={() => addItemToPhonesList({ phone: phoneValue?.phone || '' })}
          type="button"
          variant="default"
          className="gap-4"
          title="Add phone to phones list"
        >
          <Plus className="h-5 w-5" />
          <span>Add</span>
        </Button>
      </div>

      <div className="w-full max-h-[55px] flex flex-row flex-wrap items-center justify-start gap-2 overflow-y-auto">
        {phonesList.map((item, idx) => (
          <Badge key={`${idx}_${item.phone}`} variant="info" className="gap-4" title={item.phone}>
            <span>{item.phone}</span>

            <Button
              onClick={() => removeItemFromPhonesList(item.phone)}
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 rounded-full"
              title="Remove phone from phones list"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default PhonesListForm;
