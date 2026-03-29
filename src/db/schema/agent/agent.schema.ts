import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const AgentTable = pgTable('agents', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 50 }),
  phone: varchar('phone', { length: 12 }).notNull(),
  name: varchar('name').notNull(),
});
