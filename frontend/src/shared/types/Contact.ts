import { IBasePartOfEntity } from './BasePartOfEntity';
import { IPhone } from './Phone';

export interface IContact extends IBasePartOfEntity {
  id: string;
  lastName: string;
  firstName: string;

  street?: string;
  houseNumber?: string;
  city?: string;
  postalCode?: string;
  phones: IPhone[];
}
