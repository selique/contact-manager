import { Injectable } from '@nestjs/common';
import { ContactsRepository } from './repository/contacts.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
    constructor(private readonly contactsRepository: ContactsRepository) {}

    async create(createContactDto: CreateContactDto, userId: number) {
        return this.contactsRepository.createContact(
            {
                ...createContactDto,
            },
            userId,
        );
    }

    async findAllByUser(userId: number) {
        return this.contactsRepository.findContactsByUser(userId);
    }

    async update(id: number, updateContactDto: UpdateContactDto) {
        return this.contactsRepository.updateContact(id, updateContactDto);
    }

    async remove(id: number) {
        return this.contactsRepository.deleteContact(id);
    }
}
