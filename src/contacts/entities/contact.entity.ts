import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';
import { PhoneEntity } from './phone.entity';
import { EContactEntities } from '../../shared/entities/types';
import { IsString } from 'class-validator';
import { BasePartOfEntity } from 'src/shared/entities/basePart.entity';

// const contactEntitySchema = z.object({
//   id: z.string().trim().length(4294967295),
//   lastName: z.string().trim().min(1).max(100),
//   firstName: z.string().trim().min(1).max(100),
//   phone: z.array(z.string().trim().toLowerCase().min(1).max(100)).min(1),
//   street: z.string().trim().max(255).optional().or(z.literal('')),
//   houseNumber: z.string().trim().max(50).optional().or(z.literal('')),
//   city: z.string().trim().max(1090).optional().or(z.literal('')),
//   postalCode: z.string().trim().max(5).optional().or(z.literal('')),
// });

// type TContactEntitySchema = z.infer<typeof contactEntitySchema>;

@Entity({ name: EContactEntities.CONTACTS })
export class ContactEntity extends BasePartOfEntity {
  @Column({ type: 'varchar', length: 100 })
  @Expose()
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  @Expose()
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose()
  street: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Expose()
  houseNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @Expose()
  city: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  @Expose()
  postalCode: string;

  @OneToMany(() => PhoneEntity, ({ phone }) => phone)
  @IsString({ each: true })
  @Expose()
  phones: PhoneEntity[];
}
