import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEntity } from './entities/contact.entity';
import { PhoneEntity } from './entities/phone.entity';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity, PhoneEntity])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
