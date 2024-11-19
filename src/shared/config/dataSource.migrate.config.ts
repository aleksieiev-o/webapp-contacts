import { DataSourceOptions } from 'typeorm';

export const dataSourceMigrateConfig = {
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: true,
} as DataSourceOptions;
