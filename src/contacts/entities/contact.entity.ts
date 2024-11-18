import { BasePartOfEntity } from 'src/shared/entities/basePart.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { EContactEntities } from '../../shared/entities/types';
import { PhoneEntity } from './phone.entity';
import { contactEntityFieldsRules } from 'src/shared/entities/entitiesFieldsRules/contactEntityFieldsRules';

const { firstName, lastName, street, houseNumber, city, postalCode } = contactEntityFieldsRules;

@Entity({ name: EContactEntities.CONTACTS })
export class ContactEntity extends BasePartOfEntity {
  @Column({ type: 'varchar', length: firstName.max })
  firstName: string;

  @Column({ type: 'varchar', length: lastName.max })
  lastName: string;

  @Column({ type: 'varchar', length: street.max, nullable: true })
  street: string;

  @Column({ type: 'varchar', length: houseNumber.max, nullable: true })
  houseNumber: string;

  @Column({ type: 'varchar', length: city.max, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: postalCode.max, nullable: true })
  postalCode: string;

  @OneToMany(() => PhoneEntity, ({ contact }) => contact, {
    cascade: true,
  })
  phones: PhoneEntity[];
}
