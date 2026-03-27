import { AgentTable, PropertyTable } from 'src/db/schema';
import { db } from '../src/db/db';
import { faker } from '@faker-js/faker';
// todo change seeding entirely
async function seed() {
  const agents = await db
    .insert(AgentTable)
    .values(
      Array.from({ length: 20 }).map((item) => ({
        name: faker.company.name(),
        phone: `98${faker.number.int({ min: 10000000, max: 99999999 })}`,
        email: faker.internet.email(),
      })),
    )
    .returning();

  await db.insert(PropertyTable).values(
    Array.from({ length: 50 }).map(() => ({
      title: faker.lorem.words(4),
      description: faker.lorem.words(20),
      price: faker.number.int({ min: 50000, max: 1000000 }).toString(),
      bedrooms: faker.number.int({ min: 1, max: 6 }),
      bathrooms: faker.number.int({ min: 1, max: 4 }),
      propertyType: faker.helpers.arrayElement([
        'apartment',
        'house',
        'villa',
        'duplex',
      ]),
      suburbs: faker.lorem.words(4),
      agentId: faker.helpers.arrayElement(agents).id,
      internalNotes: faker.lorem.sentence(),
    })),
  );
}

seed();
