import { faker } from '@faker-js/faker';
import { ContactEntity } from 'src/contacts/entities/contact.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ContactsFactory = setSeederFactory(ContactEntity, () => {
  const contact = new ContactEntity();

  contact.firstName = faker.person.firstName();
  contact.lastName = faker.person.lastName();
  contact.street = faker.location.street();
  contact.houseNumber = faker.location.buildingNumber();
  contact.city = faker.location.city();
  contact.postalCode = faker.location.zipCode('#####');

  return contact;
});
