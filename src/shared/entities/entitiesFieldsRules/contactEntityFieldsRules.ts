import { CreateContactDTO } from 'src/contacts/dto/createContact.dto';

type ContactEntityFieldsRules = { [key in keyof Omit<CreateContactDTO, 'phones'>]: { min: number; max: number } } & {
  [key in keyof Pick<CreateContactDTO, 'phones'>]: { min: number };
};

export const contactEntityFieldsRules: ContactEntityFieldsRules = {
  firstName: { min: 3, max: 64 },
  lastName: { min: 3, max: 64 },
  street: { min: 0, max: 255 },
  houseNumber: { min: 0, max: 7 },
  city: { min: 0, max: 85 },
  postalCode: { min: 0, max: 5 },
  phones: { min: 1 },
};
