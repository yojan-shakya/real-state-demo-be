import {
  AgentTable,
  internalStatusesEnum,
  PropertyAdminMetaTable,
  PropertyTable,
  propertyTypeEnum,
} from 'src/db/schema';
import { faker } from '@faker-js/faker';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';

const AGENT_COUNT = 200;
const PROPERTIES_COUNT = 1000;
const PROPERTIES_META_COUNT = 1000;

const db = drizzle(process.env.DATABASE_URL!);

async function seed() {
  faker.seed(1);

  try {
    await db.transaction(async (tx) => {
      const agents = await tx
        .insert(AgentTable)
        .values(
          Array.from({ length: AGENT_COUNT }).map(() => ({
            name: faker.company.name(),
            phone: `98${faker.number.int({ min: 10000000, max: 99999999 })}`,
            email: faker.internet.email(),
          })),
        )
        .returning();

      const properties = await tx
        .insert(PropertyTable)
        .values(
          Array.from({ length: PROPERTIES_COUNT }).map(() => ({
            title: `${faker.number.int({ min: 1, max: 5 })} BHK ${faker.helpers.arrayElement(['Apartment', 'House', 'Villa'])} in ${faker.location.city()}`,
            description: faker.lorem.words(20),
            price: faker.number.int({ min: 50000, max: 1000000 }).toString(),
            bedrooms: faker.number.int({ min: 1, max: 6 }),
            bathrooms: faker.number.int({ min: 1, max: 4 }),
            propertyType: faker.helpers.arrayElement(
              propertyTypeEnum.enumValues,
            ),
            suburbs: faker.location.city(),
            agentId: faker.helpers.arrayElement(agents).id,
            internalNotes: faker.lorem.sentence(),
          })),
        )
        .returning();

      await tx.insert(PropertyAdminMetaTable).values(
        Array.from({ length: PROPERTIES_META_COUNT }).map(() => ({
          riskScore: faker.number.int({ min: 0, max: 100 }),
          internalStatus: faker.helpers.arrayElement(
            internalStatusesEnum.enumValues,
          ),
          propertyId: faker.helpers.arrayElement(properties).id,
        })),
      );
    });
    console.log('Seeding Successful');
  } catch (err) {
    console.error('Seeding failed', err);
  }
}

seed();
