import { DataSourceOptions } from 'typeorm';

export const dataSourceEntityConfig = {
  entities: ['src/**/*.entity{.ts,.js}'],
} as DataSourceOptions;
