import { faker } from '@faker-js/faker';
import { ContactEntity } from 'src/contacts/entities/contact.entity';
import { PhoneEntity } from 'src/contacts/entities/phone.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

const contactsNumber = 30;
const phonesNumber = 100;

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const phonesRepository = dataSource.getRepository(PhoneEntity);

    const contactFactory = factoryManager.get(ContactEntity);
    const phoneFactory = factoryManager.get(PhoneEntity);

    const contacts = await contactFactory.saveMany(contactsNumber);

    const phones = await Promise.all(
      Array(phonesNumber)
        .fill('')
        .map(async () => {
          const made = await phoneFactory.make({
            contact: faker.helpers.arrayElement(contacts),
          });
          return made;
        }),
    );

    await phonesRepository.save(phones);
  }
}
