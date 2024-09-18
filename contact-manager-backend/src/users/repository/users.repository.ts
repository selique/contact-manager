import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_ORM } from '../../drizzle/drizzle.contants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schema } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersRepository {
    constructor(
        @Inject(DRIZZLE_ORM)
        private database: PostgresJsDatabase<typeof schema>,
    ) {}

    async findOneByEmail(email: string) {
        const users = await this.database
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, email))
            .limit(1);
        return users[0] || null;
    }

    async createUser(data: {
        email: string;
        passwordHash: string;
        isAdmin?: boolean;
    }) {
        return this.database.insert(schema.users).values(data).returning();
    }

    async findUserById(id: number) {
        return this.database
            .select()
            .from(schema.users)
            .where(eq(schema.users.id, id));
    }

    async findAllUsers() {
        return this.database.select().from(schema.users);
    }
}
