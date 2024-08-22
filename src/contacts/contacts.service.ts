import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDTO } from './dto/createContact.dto';
import { PhoneEntity } from './entities/phone.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,

    @InjectRepository(PhoneEntity)
    private readonly phoneRepository: Repository<PhoneEntity>,
  ) {}

  async findAll(): Promise<ContactEntity[] | NotFoundException> {
    try {
      return await this.contactRepository.find({ relations: ['phones'] });
    } catch (err) {
      console.warn(err);
      return new NotFoundException('Contacts not found.');
    }
  }

  async findOneById(id: string): Promise<ContactEntity | NotFoundException> {
    try {
      const contact = await this.contactRepository.findOne({ where: { id }, relations: ['phones'] });

      if (!contact) {
        throw new NotFoundException(`Contact with id '${id}' not found.`);
      }

      return contact;
    } catch (err) {
      return new NotFoundException(`Some error was occured: ${err}`);
    }
  }

  async create(payload: CreateContactDTO): Promise<ContactEntity> {
    const { lastName, firstName, street, houseNumber, city, postalCode, phones } = payload;

    try {
      const contact: ContactEntity = this.contactRepository.create({ lastName, firstName, street, houseNumber, city, postalCode });

      contact.phones = phones.map((phone) => this.phoneRepository.create({ phone, contact }));

      return await this.contactRepository.save(contact);
    } catch (err) {
      console.warn(err);
    }
  }

  async removeById(id: string): Promise<ContactEntity | NotFoundException> {
    try {
      const contact = await this.contactRepository.findOne({ where: { id }, relations: ['phones'] });

      if (!contact) {
        throw new NotFoundException(`Contact with id '${id}' not found.`);
      }

      return await this.contactRepository.remove(contact);
    } catch (err) {
      return new NotFoundException(`Some error was occured: ${err}`);
    }
  }
}
