import {IsString, Length, IsNotEmpty, ArrayMinSize, IsArray} from 'class-validator';
import {PhoneEntity} from '../entities/phone.entity';

export class CreateContactDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  readonly firstName: string;

  @IsString()
  @Length(0, 255)
  readonly street: string;

  @IsString()
  @Length(0, 50)
  readonly houseNumber: string;

  @IsString()
  @Length(0, 100)
  readonly city: string;

  @IsString()
  @Length(0, 5)
  readonly postalCode: string;

  @IsArray()
  @ArrayMinSize(1)
  readonly phones: PhoneEntity[];
}
