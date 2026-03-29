import { Expose, Transform } from 'class-transformer';

export class PaginationMetaDto {
  @Expose()
  @Transform(({ value }) => parseInt(value))
  page: number;

  @Expose()
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @Expose()
  total: number;

  @Expose()
  totalPages: number;

  @Expose()
  hasNext: boolean;

  @Expose()
  hasPrev: boolean;
}
