import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PropertyListRequestDto } from './dto/property-list.request.dto';
import { DATABASE_CONNECTION } from 'src/db/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, eq, gte, like, lte, SQL, count, desc, asc } from 'drizzle-orm';
import * as schema from '../db/schema';
import {
  getPaginationMeta,
  getPaginationOffset,
} from 'src/common/utils/pagination.util';
import { plainToInstance } from 'class-transformer';
import { PaginatedPropertiesDto, PropertyDetailResponseDto } from './dto';
import { PAGINATION_CONSTANTS } from 'src/common/constants';

@Injectable()
export class PropertiesService {
  constructor(
    @Inject(DATABASE_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async getPropertyList(filters: PropertyListRequestDto) {
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

    if (filters.search !== undefined) {
      conditions.push(like(schema.PropertyTable.title, `%${filters.search}%`));
    }

    if (filters.suburb !== undefined) {
      conditions.push(
        like(schema.PropertyTable.suburbs, `%${filters.suburb}%`),
      );
    }

    if (filters.propertyType !== undefined) {
      conditions.push(
        eq(schema.PropertyTable.propertyType, filters.propertyType),
      );
    }

    const offset = getPaginationOffset(filters.page, filters.limit);

    const listings = await this.db.query.PropertyTable.findMany({
      where: and(...conditions),
      limit: filters.limit || PAGINATION_CONSTANTS.DEFAULT_LIMIT,
      offset,
      orderBy:
        filters.order === 'asc'
          ? asc(schema.PropertyTable.updatedAt)
          : desc(schema.PropertyTable.updatedAt),
    });

    const totalListings = await this.db
      .select({ count: count() })
      .from(schema.PropertyTable)
      .where(and(...conditions));

    const paginationMeta = getPaginationMeta(
      listings,
      totalListings[0]?.count || 0,
      {
        limit: filters.limit,
        page: filters.page,
      },
    );

    return plainToInstance(
      PaginatedPropertiesDto,
      {
        paginationMeta,
        data: listings,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async getPropertyById(id: string, isAdmin: boolean) {
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid Id');
    }

    const propertyDetail = await this.db.query.PropertyTable.findFirst({
      where: eq(schema.PropertyTable.id, parsedId),
      with: isAdmin ? { agent: true, adminMetadata: true } : { agent: true },
    });

    if (!propertyDetail) {
      throw new NotFoundException();
    }

    return plainToInstance(PropertyDetailResponseDto, propertyDetail, {
      excludeExtraneousValues: true,
    });
  }
}
