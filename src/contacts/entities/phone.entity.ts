import { BasePartOfEntity } from 'src/shared/entities/basePart.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { EContactEntities } from '../../shared/entities/types';
import { ContactEntity } from './contact.entity';
import { phoneEntityFieldsRules } from 'src/shared/entities/entitiesFieldsRules/phoneEntityFieldsRules';

const { phone } = phoneEntityFieldsRules;

@Entity({ name: EContactEntities.PHONES })
export class PhoneEntity extends BasePartOfEntity {
  @Column({ type: 'varchar', length: phone.max })
  phone: string;

  @ManyToOne(() => ContactEntity, ({ phones }) => phones, { onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete' })
  contact: ContactEntity;
}
