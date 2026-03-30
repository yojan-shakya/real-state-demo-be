import { InferEnum, relations } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import {
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';
import { AgentTable } from 'src/db/schema/agent/agent.schema';

export const propertyTypeEnum = pgEnum('property_type_enum', [
  'APARTMENT',
  'HOUSE',
  'VILLA',
  'OFFICE',
  'LAND',
]);

export const propertyTypeEnumValues = propertyTypeEnum.enumValues;

export type PropertyType = InferEnum<typeof propertyTypeEnum>;

export const PropertyTable = pgTable(
  'properties',
  {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    description: varchar('description').notNull(),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    bedrooms: integer('bedrooms').notNull(),
    bathrooms: integer('bathrooms').notNull(),
    agentId: integer('agent_id').references(() => AgentTable.id),
    suburbs: varchar('suburb').notNull(),
    propertyType: propertyTypeEnum('property_type').notNull(),
    landSize: integer('land_size').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    idx_price: index('idx_property_price').on(table.price),
    idx_propertyType: index('idx_property_type').on(table.propertyType),
    idx_suburbs: index('idx_property_suburbs').on(table.suburbs),
    idx_updatedAt: index('idx_property_updatedAt').on(table.updatedAt),
  }),
);
