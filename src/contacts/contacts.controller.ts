import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactEntity } from './entities/contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  findAll(): Promise<ContactEntity[] | NotFoundException> {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<ContactEntity | NotFoundException> {
    return this.contactsService.findOneById(id);
  }
}
