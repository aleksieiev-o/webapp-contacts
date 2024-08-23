import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDTO } from './dto/createContact.dto';
import { UpdateContactDTO } from './dto/updateContact.dto';
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
    return await this.findOneContactById(id);
  }

  async create(payload: CreateContactDTO): Promise<ContactEntity> {
    try {
      const contact = this.contactRepository.create(payload);

      return await this.contactRepository.save(contact);
    } catch (err) {
      console.warn(err);
    }
  }

  async update(id: string, payload: UpdateContactDTO): Promise<ContactEntity | NotFoundException> {
    try {
      const { lastName, firstName, street, houseNumber, city, postalCode, phones } = payload;
      const currentContactToUpdate = await this.contactRepository.findOne({ where: { id }, relations: ['phones'] });

      if (!currentContactToUpdate) {
        throw new NotFoundException(`Contact with id '${id}' not found.`);
      }

      Object.assign(currentContactToUpdate, { lastName, firstName, street, houseNumber, city, postalCode });

      const updatedPhoneEntities = phones.map((item) => {
        const existingPhones = currentContactToUpdate.phones.find((pn) => pn.phone === item.phone);

        if (existingPhones) {
          return existingPhones;
        }

        return this.phoneRepository.create({ phone: item.phone });
      });

      currentContactToUpdate.phones = updatedPhoneEntities;

      return await this.contactRepository.save(currentContactToUpdate);
    } catch (err) {
      return new NotFoundException(`An error occurred: ${err}`);
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
      return new NotFoundException(`An error occurred: ${err}`);
    }
  }

  private async findOneContactById(id: string): Promise<ContactEntity | NotFoundException> {
    try {
      const contact = await this.contactRepository.findOne({ where: { id }, relations: ['phones'] });

      if (!contact) {
        throw new NotFoundException(`Contact with id '${id}' not found.`);
      }

      return contact;
    } catch (err) {
      return new NotFoundException(`An error occurred: ${err}`);
    }
  }
}
