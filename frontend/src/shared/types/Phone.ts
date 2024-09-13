import { IBasePartOfEntity } from './BasePartOfEntity';

export interface IPhone extends IBasePartOfEntity {
  phone: string;
}

export interface CreatePhoneDTO extends Omit<IPhone, keyof IBasePartOfEntity> {}
