import { Expose } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BasePartOfEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Expose()
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Expose()
  updatedDate: Date;
}
