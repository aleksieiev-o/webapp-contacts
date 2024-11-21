import 'dotenv/config';
import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSourceOptions } from 'typeorm';

switch (process.env.NODE_ENV) {
  case 'development':
    config({ path: resolve(__dirname + '/../../../.env.development.local'), override: true });
    break;
  default:
    break;
}

export const dataSourceBaseConfig = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  synchronize: false,
  logging: true,
} as DataSourceOptions;
