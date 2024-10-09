import { z } from 'zod';

export const createPhoneValidation = {
  phone: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(4, 'Value must be at least 4 characters')
    .max(100, 'Value must not exceed 100 characters'),
};
