import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {ContactsService} from './contacts.service';
import {ContactEntity} from './entities/contact.entity';
import {CreateContactDTO} from './dto/createContact.dto';
import {UpdateContactDTO} from './dto/updateContact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  // TODO NotFoundException has to change to more suitable exception type
  @Get()
  findAll(): Promise<ContactEntity[] | NotFoundException> {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<ContactEntity | NotFoundException> {
    return this.contactsService.findOneById(id);
  }

  @Post('create')
  create(@Body() payload: CreateContactDTO): Promise<ContactEntity | NotFoundException> {
    return this.contactsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateContactDTO): Promise<ContactEntity | NotFoundException> {
    return this.contactsService.update(id, payload);
  }

  @Delete(':id')
  removeById(@Param('id') id: string): Promise<ContactEntity | NotFoundException> {
    return this.contactsService.removeById(id);
  }
}
