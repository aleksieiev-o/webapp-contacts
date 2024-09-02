import { FC, ReactElement } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/ui/form';
import { Asterisk } from 'lucide-react';
import { Input } from '@/components/shadcn/ui/input';
import { Textarea } from '@/components/shadcn/ui/textarea';
import { IAppFormInput } from '@/shared/ui/appInput/_types/AppFormInput.interface';
import { Skeleton } from '@/components/shadcn/ui/skeleton';

const AppFormInputText: FC<IAppFormInput> = (props): ReactElement => {
  const { mode, formModel, name, label, placeholder, required, disabled, type, isDataPending } = props;

  return (
    <FormField
      control={formModel.control}
      name={name as string}
      render={({ field }) => (
        <FormItem className={'w-full'}>
          <FormLabel aria-required={required} className={'flex'}>
            <span className={'mr-0.5'}>{label}</span>

            {required && <Asterisk className={'h-2.5 w-2.5 self-start stroke-destructive'} />}
          </FormLabel>

          <FormControl aria-required={required}>
            {mode === 'input' ? (
              <>
                {isDataPending ? (
                  <Skeleton className={'h-12 w-full'} />
                ) : (
                  <Input placeholder={placeholder} aria-required={required} type={type} disabled={disabled} {...field} value={field.value || ''} />
                )}
              </>
            ) : (
              <>
                {isDataPending ? (
                  <Skeleton className={'min-h-[80px] w-full'} />
                ) : (
                  <Textarea placeholder={placeholder} aria-required={required} disabled={disabled} {...field} value={field.value || ''} />
                )}
              </>
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormInputText;
