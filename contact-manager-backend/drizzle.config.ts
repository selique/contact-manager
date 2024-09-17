import type { Config } from 'drizzle-kit';

export default {
    schema: './src/drizzle/schema.ts',
    out: './migrations',
    dialect: 'postgresql', // Database dialect
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
    migrations: {
        prefix: 'timestamp',
    },
} satisfies Config;
