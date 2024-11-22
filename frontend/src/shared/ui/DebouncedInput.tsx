import { Input } from '@/components/shadcn/ui/input';
import { FC, ReactElement, useEffect, useState } from 'react';

interface Props {
  outerValue: string;
  onChange: (event: string) => void;
  debounce: number;
  disabled: boolean;
  title: string;
  placeholder: string;
  className?: string;
}

const DebouncedInput: FC<Props> = (props): ReactElement => {
  const { outerValue, onChange, debounce, disabled, title, placeholder, className } = props;
  const [value, setValue] = useState(outerValue);

  useEffect(() => {
    setValue(outerValue);
  }, [outerValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <Input
      onChange={(e) => setValue(e.target.value)}
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      title={title}
      className={className}
    />
  );
};

export default DebouncedInput;
