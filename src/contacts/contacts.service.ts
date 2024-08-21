import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  async findAll(): Promise<ContactEntity[] | NotFoundException> {
    try {
      return await this.contactRepository.find();
    } catch (err) {
			console.warn(err);
      return new NotFoundException('You are not get all contacts.');
    }
  }

  async findOneById(id: string): Promise<ContactEntity | NotFoundException> {
    try {
      const contact = await this.contactRepository.findOneBy({ id });

      if (!contact) {
        throw new NotFoundException(`Contact with id '${id}' not found.`);
      }

      return contact;
    } catch (err) {
      return new NotFoundException(`Some error was occured: ${err}`);
    }
  }
}
