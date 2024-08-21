import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { PhoneEntity } from './entities/phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity, PhoneEntity])],
  controllers: [],
  providers: [],
})
export class ContactsModule {}
