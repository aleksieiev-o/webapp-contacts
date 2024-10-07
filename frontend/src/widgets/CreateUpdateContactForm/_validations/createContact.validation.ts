import { z } from 'zod';
import { createPhoneValidation } from './createPhone.validation';

export const createContactValidation = {
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
      .max(255, 'Value must not exceed 255 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  houseNumber: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(50, 'Value must not exceed 50 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  city: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(100, 'Value must not exceed 100 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  postalCode: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(5, 'Value must not exceed 5 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  phones: z.array(z.object(createPhoneValidation)).min(1, 'List must contain at least 1 value'),
};
