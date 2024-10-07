import { Badge } from '@/components/shadcn/ui/badge';
import { Button } from '@/components/shadcn/ui/button';
import AppInputText from '@/shared/ui/appInput/AppInpt.text';
import { Plus, X } from 'lucide-react';
import { FC, ReactElement, useMemo, useState } from 'react';
import { Control, useFieldArray, useWatch } from 'react-hook-form';
import { z, ZodError, ZodIssueCode } from 'zod';
import { createPhoneValidation } from '../_validations/createPhone.validation';
import { IPhone } from '@/shared/types/Phone';
import { CreateContactDTO } from '@/shared/types/Contact';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formModel: any;
}

const PhonesListForm: FC<Props> = (props): ReactElement => {
  const { formModel } = props;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentPhone, setCurrentPhone] = useState<string>('');
  const {
    control,
    resetField,
    formState: { errors },
  } = formModel;

  const { fields, append, remove } = useFieldArray({
    control: control as Control<CreateContactDTO>,
    name: 'phones',
  });

  const phonesList = useWatch({
    control: control,
    name: 'phones',
    defaultValue: [],
  });

  const phoneSchemaExtended = useMemo(
    () =>
      z.object(createPhoneValidation).superRefine((data, ctx) => {
        if (phonesList && phonesList.filter((item: IPhone) => item.phone === data.phone).length > 0) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            path: ['phones'],
            message: 'This value is already exist in the list',
          });
        }
      }),
    [phonesList],
  );

  const addItemToPhonesList = () => {
    setErrorMessage('');

    try {
      const phone: z.infer<typeof phoneSchemaExtended> = phoneSchemaExtended.parse({ phone: currentPhone });

      if (currentPhone.trim()) {
        append(phone);
        setCurrentPhone('');
        resetField('phone');
      }

      setCurrentPhone('');
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setErrorMessage(err.issues.length ? err.issues[0].message : '');
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start gap-4">
      <div className="w-full flex flex-row flex-nowrap items-end justify-start gap-4">
        <AppInputText
          handleOnChange={(value) => setCurrentPhone(value)}
          value={currentPhone}
          mode={'input'}
          type={'text'}
          label={'Phone'}
          placeholder={'Enter a phone'}
          required={true}
          disabled={false}
          isDataPending={false}
          errorMessage={errorMessage || errors.phones?.message || ''}
        />

        <div className="h-full relative">
          <Button
            onClick={addItemToPhonesList}
            type="button"
            variant="default"
            className="gap-4 relative top-[22px]"
            title="Add phone to phones list"
          >
            <Plus className="h-5 w-5" />
            <span>Add</span>
          </Button>
        </div>
      </div>

      <div className="w-full max-h-[55px] flex flex-row flex-wrap items-center justify-start gap-2 overflow-y-auto">
        {fields.map((item, idx) => (
          <Badge key={`${idx}_${item.phone}`} variant="info" className="gap-4" title={item.phone}>
            <span>{item.phone}</span>

            <Button
              onClick={() => remove(idx)}
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
