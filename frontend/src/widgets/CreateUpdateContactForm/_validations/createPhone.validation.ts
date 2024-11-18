import { CreatePhoneDTO } from '@/shared/types/Phone';
import { z } from 'zod';

type PhoneEntityFieldsRules = { [key in keyof CreatePhoneDTO]: { min: number; max: number } };

const phoneEntityFieldsRules: PhoneEntityFieldsRules = {
  phone: { min: 3, max: 38 },
};

const { phone } = phoneEntityFieldsRules;

export const createPhoneValidation = {
  phone: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(phone.min, `Value must be at least ${phone.min} characters`)
    .max(phone.max, `Value must not exceed ${phone.max} characters`),
};
