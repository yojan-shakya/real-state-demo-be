import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE!,
    password: process.env.DB_PASSWORD,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
