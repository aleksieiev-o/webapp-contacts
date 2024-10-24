import { CreateContactDTO } from 'src/contacts/dto/createContact.dto';
import { CreatePhoneDTO } from 'src/contacts/dto/createPhone.dto';

type ContactValueLengths = { [key in keyof Omit<CreateContactDTO, 'phones'>]: { min: number; max: number } } & {
  [key in keyof Pick<CreateContactDTO, 'phones'>]: { min: number };
};
type PhoneValueLengths = { [key in keyof CreatePhoneDTO]: { min: number; max: number } };

export const contactValueLengths: ContactValueLengths = {
  firstName: { min: 3, max: 64 },
  lastName: { min: 3, max: 64 },
  street: { min: 0, max: 255 },
  houseNumber: { min: 0, max: 7 },
  city: { min: 0, max: 85 },
  postalCode: { min: 0, max: 5 },
  phones: { min: 1 },
};

export const phoneValueLengths: PhoneValueLengths = {
  phone: { min: 4, max: 38 },
};
