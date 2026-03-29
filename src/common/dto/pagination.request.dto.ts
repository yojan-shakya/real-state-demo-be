import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PAGINATION_CONSTANTS } from '../constants';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = PAGINATION_CONSTANTS.DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  sort?: string = PAGINATION_CONSTANTS.DEFAULT_SORT_KEY;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = PAGINATION_CONSTANTS.DEFAULT_SORT;
}
