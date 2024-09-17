import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { users } from '../../users/entities/users.entity'; // Ensure correct import path

export const contacts = pgTable('contacts', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    address: text('address'),
    phone: text('phone'),
    email: text('email').notNull(),
    userId: integer('user_id').references(() => users.id),
});
