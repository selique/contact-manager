import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ContactsService } from './contacts/contacts.service';
import { ContactsModule } from './contacts/contacts.module';
import { NestDrizzleModule } from './drizzle/drizzle.module';
import { schema } from './drizzle/schema';
@Module({
    imports: [
        AuthModule,
        ContactsService,
        ContactsModule,
        UsersModule,
        UsersService,
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
    controllers: [AppController],
    providers: [AppService, ContactsService, UsersService],
})
export class AppModule {}
