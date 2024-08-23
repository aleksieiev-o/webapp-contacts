import {BasePartOfEntity} from 'src/shared/entities/basePart.entity';
import {Column, Entity, ManyToOne} from 'typeorm';
import {EContactEntities} from '../../shared/entities/types';
import {ContactEntity} from './contact.entity';

@Entity({name: EContactEntities.PHONES})
export class PhoneEntity extends BasePartOfEntity {
  @Column({type: 'varchar', length: 100})
  phone: string;

  @ManyToOne(() => ContactEntity, ({phones}) => phones, {onDelete: 'CASCADE', onUpdate: 'CASCADE', orphanedRowAction: 'delete'})
  contact: ContactEntity;
}
