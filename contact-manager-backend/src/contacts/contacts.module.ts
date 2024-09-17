import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { DrizzleService } from '../drizzle/drizzle.service';
import { ContactsRepository } from './repository/contacts.repository';

@Module({
    controllers: [ContactsController],
    providers: [ContactsService, DrizzleService, ContactsRepository],
    exports: [ContactsService],
})
export class ContactsModule {}
