import { PaginationDto } from '../dto/pagination.dto';
import {
  PaginatedResponse,
  PaginationMeta,
} from '../interface/pagination.interface';

export function paginate<T>(
  data: T[],
  total: number,
  query: Pick<PaginationDto, 'page' | 'limit'>,
): PaginatedResponse<T> {
  const { page = 1, limit = 20 } = query;
  const totalPages = Math.ceil(total / limit);

  const paginationMeta: PaginationMeta = {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };

  return { data, paginationMeta };
}

export function getPaginationOffset(page?: number, limit?: number) {
  return ((page ?? 1) - 1) * (limit ?? 20);
}
