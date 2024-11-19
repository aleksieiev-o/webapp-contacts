import { DataSourceOptions } from 'typeorm';

export const dataSourceBaseConfig = {
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.MARIADB_USER || 'root',
  password: process.env.MARIADB_PASSWORD || 'root',
  database: process.env.MARIADB_DATABASE || 'contactsdatabase',
  synchronize: false,
  logging: true,
} as DataSourceOptions;
