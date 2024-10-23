import { z } from 'zod';
import { createPhoneValidation } from './createPhone.validation';

export const createContactValidation = {
  lastName: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(1, 'Value must be at least 1 character')
    .max(64, 'Value must not exceed 64 characters'),
  firstName: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(1, 'Value must be at least 1 character')
    .max(64, 'Value must not exceed 64 characters'),
  street: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .min(1, 'Value must be at least 1 character')
      .max(255, 'Value must not exceed 255 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  houseNumber: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .min(1, 'Value must be at least 1 character')
      .max(7, 'Value must not exceed 7 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  city: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(85, 'Value must not exceed 85 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  postalCode: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .min(2, 'Value must be at least 2 characters')
      .max(5, 'Value must not exceed 5 characters')
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  phones: z.array(z.object(createPhoneValidation)).min(1, 'List of phones must contain at least 1 value'),
};
