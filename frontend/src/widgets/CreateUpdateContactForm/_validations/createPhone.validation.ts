import { z } from 'zod';
import { phoneValueLengths } from './_constant';

const { phone } = phoneValueLengths;

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
