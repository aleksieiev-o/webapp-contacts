import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AppDataSource } from './shared/utils/dataSource';

async function bootstrap() {
  // await AppDataSource.initialize(); not necessary. It is defined in the DatabaseModule

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT, process.env.HOST);
}
bootstrap();
