import {
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { AgentTable } from '../agent';

export const PropertyTable = pgTable('properties', {
  id: serial('id').primaryKey(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(),
  price: decimal('price', { precision: 12, scale: 2 }),
  bedrooms: integer('bedrooms').notNull(),
  bathrooms: integer('bathrooms').notNull(),
  agentId: integer('agent_id').references(() => AgentTable.id),
  suburbs: varchar('suburb').notNull(),
  // todo enum
  propertyType: varchar('property_type').notNull(),
  internalNotes: varchar('internal_notes').notNull(),
});
