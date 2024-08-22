import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ContactEntity } from './contact.entity';
import { EContactEntities } from '../../shared/entities/types';
import { BasePartOfEntity } from 'src/shared/entities/basePart.entity';

// const phoneEntitySchema = z.object({
//   phone: z.string().trim().toLowerCase().min(1).max(100),
// });

// export type TPhoneEntitySchema = z.infer<typeof phoneEntitySchema>;

@Entity({ name: EContactEntities.PHONES })
export class PhoneEntity extends BasePartOfEntity {
  @Column({ type: 'varchar', length: 100 })
  @Expose()
  phone: string;

  @ManyToOne(() => ContactEntity, ({ phones }) => phones, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @Expose()
  contact: ContactEntity;
}
