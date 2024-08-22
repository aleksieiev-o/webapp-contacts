import { Body, Controller, Delete, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactEntity } from './entities/contact.entity';
import { CreateContactDTO } from './dto/createContact.dto';

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

  @Post('create')
  create(@Body() payload: CreateContactDTO): Promise<ContactEntity> {
    return this.contactsService.create(payload);
  }

  @Delete(':id')
  removeById(@Param('id') id: string): Promise<ContactEntity | NotFoundException> {
    return this.contactsService.removeById(id);
  }
}
