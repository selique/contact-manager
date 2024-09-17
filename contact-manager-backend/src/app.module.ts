import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { NestDrizzleModule } from './drizzle/drizzle.module';
import { schema } from './drizzle/schema';
import { ContactsRepository } from './contacts/repository/contacts.repository';
import { UsersRepository } from './users/repository/users.repository';
import { ContactsController } from './contacts/contacts.controller';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';

@Module({
    imports: [
        AuthModule,
        ContactsModule,
        UsersModule,
        ConfigModule.forRoot({ isGlobal: true }),
        NestDrizzleModule.forRootAsync({
            useFactory: () => ({
                driver: 'postgres-js',
                url: process.env.DATABASE_URL,
                options: { schema },
                migrationOptions: { migrationsFolder: './migration' },
            }),
        }),
    ],
    controllers: [
        AppController,
        ContactsController,
        AuthController,
        UsersController,
    ],
    providers: [AppService, ContactsRepository, UsersRepository],
})
export class AppModule {}
