import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { dataSourceBaseConfig } from 'src/shared/config/dataSource.base.config';
import { dataSourceSeedConfig } from 'src/shared/config/dataSource.seed.config';
import { dataSourceEntityConfig } from 'src/shared/config/dataSource.entity.config';

const dataSource = new DataSource(Object.assign(dataSourceBaseConfig, dataSourceEntityConfig, dataSourceSeedConfig));

dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
  process.exit();
});
