import { z } from 'zod';
import { createPhoneValidation } from './createPhone.validation';
import { CreateContactDTO } from '@/shared/types/Contact';

type ContactEntityFieldsRules = { [key in keyof Omit<CreateContactDTO, 'phones'>]: { min: number; max: number } } & {
  [key in keyof Pick<CreateContactDTO, 'phones'>]: { min: number };
};

const contactEntityFieldsRules: ContactEntityFieldsRules = {
  firstName: { min: 3, max: 64 },
  lastName: { min: 3, max: 64 },
  street: { min: 0, max: 255 },
  houseNumber: { min: 0, max: 7 },
  city: { min: 0, max: 85 },
  postalCode: { min: 0, max: 5 },
  phones: { min: 1 },
};

const { firstName, lastName, street, houseNumber, city, postalCode, phones } = contactEntityFieldsRules;

export const createContactValidation = {
  firstName: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(firstName.min, `Value must be at least ${firstName.max} character`)
    .max(firstName.max, `Value must not exceed ${firstName.max} characters`),
  lastName: z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(lastName.min, `Value must be at least ${lastName.max} character`)
    .max(lastName.max, `Value must not exceed ${lastName.max} characters`),
  street: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(street?.max || 255, `Value must not exceed ${street?.max || 255} characters`)
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  houseNumber: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(houseNumber?.max || 7, `Value must not exceed ${houseNumber?.max || 7} characters`)
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  city: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(city?.max || 85, `Value must not exceed ${city?.max || 85} characters`)
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  postalCode: z.optional(
    z
      .string({
        invalid_type_error: 'Value must be a string',
      })
      .trim()
      .max(postalCode?.max || 5, `Value must not exceed ${postalCode?.max || 5} characters`)
      .transform((val) => (val.length === 0 ? undefined : val)),
  ),
  phones: z.array(z.object(createPhoneValidation)).min(phones?.min || 1, `List of phones must contain at least ${phones?.min || 1} value`),
};
