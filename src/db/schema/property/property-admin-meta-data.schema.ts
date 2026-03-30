import { integer } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';
import { PropertyTable } from './property.schema';
import { pgEnum } from 'drizzle-orm/pg-core';

export const internalStatusesEnum = pgEnum('internal_property_status_enum', [
  'fraud_suspected',
  'approved',
  'rejected',
  'under_review',
]);

export const internalStatusEnumValues = internalStatusesEnum.enumValues;

export const PropertyAdminMetaTable = pgTable('property_admin_meta', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').references(() => PropertyTable.id),
  internalStatus:
    internalStatusesEnum('internal_status').default('under_review'),
  riskScore: integer('risk_score').notNull(),
});
