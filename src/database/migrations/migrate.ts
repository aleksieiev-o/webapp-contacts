import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dataSourceBaseConfig } from 'src/shared/config/dataSource.base.config';
import { dataSourceMigrateConfig } from 'src/shared/config/dataSource.migrate.config';
import { dataSourceEntityConfig } from 'src/shared/config/dataSource.entity.config';

const dataSource = new DataSource(Object.assign(dataSourceBaseConfig, dataSourceEntityConfig, dataSourceMigrateConfig));

dataSource.initialize().then(async () => {
  await dataSource.runMigrations();
  process.exit();
});
