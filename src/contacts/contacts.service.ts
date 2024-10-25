import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDTO } from './dto/createContact.dto';
import { UpdateContactDTO } from './dto/updateContact.dto';
import { PhoneEntity } from './entities/phone.entity';
import { CustomResponse } from './types';

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
      throw new NotFoundException(err);
    }
  }

  async findOneById(id: string): CustomResponse<ContactEntity> {
    try {
      const contact = await this.contactRepository.findOne({ where: { id }, relations: ['phones'] });

      if (!contact) {
        throw new BadRequestException();
      }

      return contact;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async create(payload: CreateContactDTO): CustomResponse<ContactEntity> {
    try {
      const contact = this.contactRepository.create(payload);

      return await this.contactRepository.save(contact);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async update(id: string, payload: UpdateContactDTO): CustomResponse<ContactEntity> {
    try {
      const { lastName, firstName, street, houseNumber, city, postalCode, phones } = payload;
      const currentContactToUpdate = await this.contactRepository.findOne({ where: { id }, relations: ['phones'] });

      if (!currentContactToUpdate) {
        throw new BadRequestException();
      }

      Object.assign(currentContactToUpdate, { lastName, firstName, street, houseNumber, city, postalCode });

      if (phones) {
        const updatedPhoneEntities = phones.map((item) => {
          const existingPhones = currentContactToUpdate.phones.find((pn) => pn.phone === item.phone);

          if (existingPhones) {
            return existingPhones;
          }

          return this.phoneRepository.create({ phone: item.phone });
        });

        currentContactToUpdate.phones = updatedPhoneEntities;
      }

      return await this.contactRepository.save(currentContactToUpdate);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async removeById(id: string): CustomResponse<ContactEntity> {
    try {
      const contact = await this.contactRepository.findOne({ where: { id }, relations: ['phones'] });

      if (!contact) {
        throw new BadRequestException();
      }

      return await this.contactRepository.remove(contact);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
