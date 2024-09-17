export const dbConfig = {
    user: process.env.DB_USER || 'your-db-user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'your-db-name',
    password: process.env.DB_PASSWORD || 'your-db-password',
    port: Number(process.env.DB_PORT) || 5432,
};
