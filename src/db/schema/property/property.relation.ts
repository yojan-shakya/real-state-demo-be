import { relations } from 'drizzle-orm';
import { PropertyTable } from '../property';
import { AgentTable } from '../agent';

export const PropertyRelations = relations(PropertyTable, ({ one }) => ({
  agent: one(AgentTable, {
    fields: [PropertyTable.agentId],
    references: [AgentTable.id],
  }),
}));
