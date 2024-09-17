import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { dbConfig } from './db.config'; // Import your database configuration
import { schema } from './schema'; // Import your schema definition

@Injectable()
export class DrizzleService {
  private pool = new Pool(dbConfig); // Initialize PostgreSQL connection pool

  public db = drizzle(this.pool, { schema });

  constructor() {
    this.init();
  }

  private async init() {
    // Log initialization or perform any required setup
    console.log('Drizzle ORM initialized with schema.');
  }

  // Define CRUD operations for contacts
  public async createContact(data: {
    name: string;
    address?: string;
    phone?: string;
    email: string;
    userId: number;
  }) {
    return this.db.insert(schema.contacts).values(data).returning();
  }

  public async findContactsByUser(userId: number) {
    return this.db
      .select()
      .from(schema.contacts)
      .where(schema.contacts.userId.eq(userId))
      .get();
  }

  public async updateContact(
    id: number,
    data: {
      name?: string;
      address?: string;
      phone?: string;
      email?: string;
      userId?: number;
    },
  ) {
    return this.db
      .update(schema.contacts)
      .set(data)
      .where({ id }) // Adjusted based on Drizzle ORM syntax
      .returning();
  }

  public async deleteContact(id: number) {
    return this.db
      .delete(schema.contacts)
      .where({ id }) // Adjusted based on Drizzle ORM syntax
      .returning();
  }

  // Define CRUD operations for users
  public async createUser(data: {
    email: string;
    passwordHash: string;
    isAdmin?: boolean;
  }) {
    return this.db.insert(schema.users).values(data).returning();
  }

  public async findUserById(id: number) {
    return this.db
      .select()
      .from(schema.users)
      .where({ id }) // Adjusted based on Drizzle ORM syntax
      .get(); // Use .get() if .one() does not exist
  }
}
