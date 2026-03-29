import { Expose, Type } from 'class-transformer';
import { PaginationMetaDto } from 'src/common/dto';

export class PropertyListItemResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  price: string;

  @Expose()
  suburbs: string;
}

export class PaginatedPropertiesDto {
  @Expose()
  @Type(() => PropertyListItemResponseDto)
  data: PropertyListItemResponseDto[];

  @Expose()
  @Type(() => PaginationMetaDto)
  paginationMeta: PaginationMetaDto;
}
