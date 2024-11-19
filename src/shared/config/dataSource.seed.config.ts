import MainSeeder from 'src/database/seeds/main.seeder';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceSeedConfig = {
  factories: ['src/database/seeds/**/*.factory{.ts,.js}'],
  seeds: [MainSeeder],
} as DataSourceOptions & SeederOptions;
