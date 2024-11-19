import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1725001637471 implements MigrationInterface {
  name = 'InitialMigration1725001637471';
  transaction: true;
  dataBase = process.env.MARIADB_DATABASE || 'contactsdatabase';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const isContactsTableExist = await queryRunner.hasTable('contacts');
    if (!isContactsTableExist) {
      await queryRunner.query(`CREATE TABLE contacts (
        id char(36) NOT NULL,
        createdDate TIMESTAMP NOT NULL DEFAULT now(),
        updatedDate TIMESTAMP NOT NULL DEFAULT now(),
        lastName varchar(100) NOT NULL,
        firstName varchar(100) NOT NULL,
        street varchar(255),
        houseNumber varchar(50),
        city varchar(100),
        postalCode varchar(5),
        PRIMARY KEY (id)
    )`);
    }

    const isPhonesTableExist = await queryRunner.hasTable('phones');
    if (!isPhonesTableExist) {
      await queryRunner.query(`CREATE TABLE phones (
        id char(36) NOT NULL,
        createdDate TIMESTAMP NOT NULL DEFAULT now(),
        updatedDate TIMESTAMP NOT NULL DEFAULT now(),
        phone varchar(100) NOT NULL,
        contactId char(36),
        PRIMARY KEY (id),
        CONSTRAINT FK_contact FOREIGN KEY (contactId) REFERENCES contacts(id) ON DELETE CASCADE ON UPDATE CASCADE
    )`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE phones`);
    await queryRunner.query(`DROP TABLE contacts`);
    await queryRunner.query(`DROP DATABASE ${this.dataBase}`);
  }
}
