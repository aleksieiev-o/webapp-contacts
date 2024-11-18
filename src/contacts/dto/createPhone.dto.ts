import { IsNotEmpty, IsString, Length } from 'class-validator';
import { phoneEntityFieldsRules } from 'src/shared/entities/entitiesFieldsRules/phoneEntityFieldsRules';

const { phone } = phoneEntityFieldsRules;

export class CreatePhoneDTO {
  @IsNotEmpty()
  @IsString()
  @Length(phone.min, phone.max)
  readonly phone: string;
}
