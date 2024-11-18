import { IsString, Length, IsNotEmpty, ArrayMinSize, IsArray } from 'class-validator';
import { PhoneEntity } from '../entities/phone.entity';
import { contactEntityFieldsRules } from 'src/shared/entities/entitiesFieldsRules/contactEntityFieldsRules';

const { firstName, lastName, street, houseNumber, city, postalCode, phones } = contactEntityFieldsRules;

export class CreateContactDTO {
  @IsNotEmpty()
  @IsString()
  @Length(firstName.min, firstName.max)
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @Length(lastName.min, lastName.max)
  readonly lastName: string;

  @IsString()
  @Length(street.min, street.max)
  readonly street: string;

  @IsString()
  @Length(houseNumber.min, houseNumber.max)
  readonly houseNumber: string;

  @IsString()
  @Length(city.min, city.max)
  readonly city: string;

  @IsString()
  @Length(postalCode.min, postalCode.max)
  readonly postalCode: string;

  @IsArray()
  @ArrayMinSize(phones.min)
  readonly phones: PhoneEntity[];
}
