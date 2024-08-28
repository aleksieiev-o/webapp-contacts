import { IBasePartOfEntity } from './BasePartOfEntity';
import { CreatePhoneDTO } from './Phone';

export interface IContact extends IBasePartOfEntity {
  id: string;
  lastName: string;
  firstName: string;

  street?: string;
  houseNumber?: string;
  city?: string;
  postalCode?: string;
  phones: CreatePhoneDTO[];
}

export interface CreateContactDTO extends Omit<IContact, keyof IBasePartOfEntity> {}
