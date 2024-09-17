import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { DrizzleService } from '../drizzle/drizzle.service';

@Module({
    controllers: [ContactsController],
    providers: [ContactsService, DrizzleService],
})
export class ContactsModule {}
