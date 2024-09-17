import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts', // Path to schema file
  out: './migrations', // Path to output directory
  dialect: 'postgresql', // Database dialect
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
