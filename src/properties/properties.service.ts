import { Inject, Injectable } from '@nestjs/common';
import { GetPropertyListDto } from './dto/get-property-list.dto';
import { DATABASE_CONNECTION } from 'src/db/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq, gte, like, lte, SQL, count } from 'drizzle-orm';
import * as schema from './schema/property.schema';
import {
  getPaginationOffset,
  paginate,
} from 'src/shared/utils/pagination.util';

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(DATABASE_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async filterListings(filters: GetPropertyListDto) {
    const conditions: SQL[] = [];

    if (filters.baths !== undefined) {
      conditions.push(eq(schema.PropertyTable.bathrooms, filters.baths));
    }

    if (filters.beds !== undefined) {
      conditions.push(eq(schema.PropertyTable.bedrooms, filters.beds));
    }

    if (filters.priceMax !== undefined) {
      conditions.push(
        lte(schema.PropertyTable.price, filters.priceMax.toString()),
      );
    }

    if (filters.priceMin !== undefined) {
      conditions.push(
        gte(schema.PropertyTable.price, filters.priceMin.toString()),
      );
    }

    if (filters.propertyType !== undefined) {
      conditions.push(
        eq(schema.PropertyTable.propertyType, filters.propertyType),
      );
    }

    if (filters.search !== undefined) {
      conditions.push(like(schema.PropertyTable.title, `%${filters.search}%`));
    }

    if (filters.suburb !== undefined) {
      conditions.push(
        like(schema.PropertyTable.suburbs, `%${filters.suburb}%`),
      );
    }

    // todo property_type filters

    const offset = getPaginationOffset(filters.page, filters.limit);

    const listings = await this.db
      .select()
      .from(schema.PropertyTable)
      .where(and(...conditions))
      // todo put pagination datas in constants
      .limit(filters.limit || 1)
      .offset(offset);
    // todo by date
    // .orderBy(
    //   filters.order === 'desc'
    //     ? desc(schema.PropertyTable.title)
    //     : asc(schema.PropertyTable.title),
    // );

    const totalListings = await this.db
      .select({ count: count() })
      .from(schema.PropertyTable)
      .where(and(...conditions));

    return paginate(listings, totalListings[0].count, {
      limit: filters.limit,
      page: filters.page,
    });
  }

  async getListingById(id: string) {
    return this.db.query.PropertyTable.findFirst({
      where: eq(schema.PropertyTable.id, parseInt(id)),
    });
  }
}
