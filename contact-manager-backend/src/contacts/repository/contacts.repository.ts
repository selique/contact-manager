import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_ORM } from '../../drizzle/drizzle.contants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { CreateContactDto } from '../dto/create-contact.dto';

@Injectable()
export class ContactsRepository {
    constructor(
        @Inject(DRIZZLE_ORM)
        private database: PostgresJsDatabase<typeof schema>,
    ) {}

    async createContact(data: CreateContactDto, userId: number) {
        const contactData = {
            ...data,
            userId,
        };

        return this.database
            .insert(schema.contacts)
            .values(contactData)
            .returning();
    }

    async findContactsByUser(userId: number) {
        return this.database
            .select()
            .from(schema.contacts)
            .innerJoin(
                schema.users,
                eq(schema.contacts.userId, schema.users.id),
            )
            .where(eq(schema.users.id, userId));
    }

    async updateContact(
        id: number,
        data: {
            name?: string;
            address?: string;
            phone?: string;
            email?: string;
            userId?: number;
        },
    ) {
        return this.database
            .update(schema.contacts)
            .set(data)
            .where(eq(schema.contacts.id, id))
            .returning();
    }

    async deleteContact(id: number) {
        return this.database
            .delete(schema.contacts)
            .where(eq(schema.contacts.id, id))
            .returning();
    }
}
