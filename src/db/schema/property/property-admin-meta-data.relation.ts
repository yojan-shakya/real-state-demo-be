import { relations } from 'drizzle-orm';
import { PropertyTable } from './property.schema';
import { PropertyAdminMetaTable } from './property-admin-meta-data.schema';

export const PropertyAdminMetaRelations = relations(
  PropertyAdminMetaTable,
  ({ one }) => ({
    property: one(PropertyTable, {
      fields: [PropertyAdminMetaTable.propertyId],
      references: [PropertyTable.id],
    }),
  }),
);
