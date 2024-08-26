import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePhoneDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 100)
  readonly phone: string;
}
