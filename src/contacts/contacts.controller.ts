import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactEntity } from './entities/contact.entity';
import { CreateContactDTO } from './dto/createContact.dto';
import { UpdateContactDTO } from './dto/updateContact.dto';
import { CustomResponse } from './types';
import { HttpExceptionFilter } from 'src/shared/exceptions/filters/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Get()
  findAll(): Promise<ContactEntity[] | NotFoundException> {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): CustomResponse<ContactEntity> {
    return this.contactsService.findOneById(id);
  }

  @Post('create')
  create(@Body() payload: CreateContactDTO): CustomResponse<ContactEntity> {
    return this.contactsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateContactDTO): CustomResponse<ContactEntity> {
    return this.contactsService.update(id, payload);
  }

  @Delete(':id')
  removeById(@Param('id') id: string): CustomResponse<ContactEntity> {
    return this.contactsService.removeById(id);
  }
}
