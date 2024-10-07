import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: true,
  synchronize: false,
  logging: true,
});
