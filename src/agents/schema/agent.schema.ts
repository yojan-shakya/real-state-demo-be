import { relations } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { PropertyTable } from 'src/properties/schema/property.schema';

export const AgentTable = pgTable('agents', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 50 }),
  phone: varchar('phone', { length: 12 }).notNull(),
  name: varchar('name').notNull(),
});

export const AgentRelations = relations(AgentTable, ({ many }) => ({
  properties: many(PropertyTable),
}));
