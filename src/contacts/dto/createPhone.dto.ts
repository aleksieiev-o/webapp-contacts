import { IsNotEmpty, IsString, Length } from 'class-validator';
import { phoneValueLengths } from 'src/contacts/_constant';

const { phone } = phoneValueLengths;

export class CreatePhoneDTO {
  @IsNotEmpty()
  @IsString()
  @Length(phone.min, phone.max)
  readonly phone: string;
}
