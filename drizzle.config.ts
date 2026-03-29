import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './src/db/schema/index.ts',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.NEST_DB_HOST!,
    port: parseInt(process.env.NEST_DB_PORT!),
    user: process.env.NEST_DB_USER,
    database: process.env.NEST_DB_DATABASE!,
    password: process.env.NEST_DB_PASSWORD,
    ssl: false,
  },
  verbose: true,
  strict: true,
});
