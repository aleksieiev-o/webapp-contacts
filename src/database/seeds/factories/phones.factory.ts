import { faker } from '@faker-js/faker';
import { PhoneEntity } from 'src/contacts/entities/phone.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PhonesFactory = setSeederFactory(PhoneEntity, () => {
  const phone = new PhoneEntity();

  phone.phone = faker.phone.number({ style: 'international' });

  return phone;
});
