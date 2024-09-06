import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.production', '.deployment.env'],
    }),
    DatabaseModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
