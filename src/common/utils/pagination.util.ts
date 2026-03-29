import { PaginationMetaDto } from '../dto';
import { PaginationDto } from '../dto/pagination.request.dto';

export function getPaginationMeta<T>(
  data: T[],
  total: number,
  query: Pick<PaginationDto, 'page' | 'limit'>,
): PaginationMetaDto {
  const { page = 1, limit = 20 } = query;
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    total,
  };
}

export function getPaginationOffset(page?: number, limit?: number) {
  return ((page ?? 1) - 1) * (limit ?? 20);
}
