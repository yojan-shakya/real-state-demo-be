import { relations } from 'drizzle-orm';
import { PropertyTable } from 'src/db/schema/property/property.schema';
import { AgentTable } from './agent.schema';

export const AgentRelations = relations(AgentTable, ({ many }) => ({
  properties: many(PropertyTable),
}));
