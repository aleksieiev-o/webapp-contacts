import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER_NAME'),
        password: configService.get<string>('DB_USER_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // migrations: [join(__dirname, '/../../', 'database/migrations/**/*{.ts,.js}')],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsTableName: 'typeorm_migrations',
        migrationsRun: true,
        synchronize: false,
        logging: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
