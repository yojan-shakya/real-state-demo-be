import { relations } from 'drizzle-orm';
import { AgentTable } from './agent.table';
import { PropertyTable } from '../property';

export const AgentRelations = relations(AgentTable, ({ many }) => ({
  properties: many(PropertyTable),
}));
