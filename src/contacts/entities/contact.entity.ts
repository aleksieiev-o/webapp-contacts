import { BasePartOfEntity } from 'src/shared/entities/basePart.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { EContactEntities } from '../../shared/entities/types';
import { PhoneEntity } from './phone.entity';

@Entity({ name: EContactEntities.CONTACTS })
export class ContactEntity extends BasePartOfEntity {
  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  street: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  houseNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  postalCode: string;

  @OneToMany(() => PhoneEntity, ({ contact }) => contact, {
    cascade: true,
    eager: true,
  })
  phones: PhoneEntity[];
}
