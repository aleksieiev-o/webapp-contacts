import { CreatePhoneDTO } from 'src/contacts/dto/createPhone.dto';

type PhoneEntityFieldsRules = { [key in keyof CreatePhoneDTO]: { min: number; max: number } };

export const phoneEntityFieldsRules: PhoneEntityFieldsRules = {
  phone: { min: 3, max: 38 },
};
