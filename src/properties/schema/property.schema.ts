import { relations } from 'drizzle-orm';
import {
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { AgentTable } from 'src/agents/schema/agent.schema';

// todo created and updated date and change it in filter asc desc
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

export const PropertyRelations = relations(PropertyTable, ({ one }) => ({
  agent: one(AgentTable, {
    fields: [PropertyTable.agentId],
    references: [AgentTable.id],
  }),
}));
