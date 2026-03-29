import { relations } from 'drizzle-orm';
import { AgentTable } from 'src/db/schema/agent/agent.schema';
import { PropertyTable } from './property.schema';
import { PropertyAdminMetaTable } from './property-admin-meta-data.schema';

export const PropertyRelations = relations(PropertyTable, ({ one }) => ({
  agent: one(AgentTable, {
    fields: [PropertyTable.agentId],
    references: [AgentTable.id],
  }),
  adminMetadata: one(PropertyAdminMetaTable, {
    fields: [PropertyTable.id],
    references: [PropertyAdminMetaTable.propertyId],
  }),
}));
