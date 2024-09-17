import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
    constructor(private readonly db: DrizzleService) {}

    async create(createContactDto: CreateContactDto, userId: number) {
        return this.db.createContact({ ...createContactDto, userId });
    }

    async findAllByUser(userId: number) {
        return this.db.findContactsByUser(userId);
    }

    async update(id: number, updateContactDto: UpdateContactDto) {
        return this.db.updateContact(id, updateContactDto);
    }

    async remove(id: number) {
        return this.db.deleteContact(id);
    }
}
