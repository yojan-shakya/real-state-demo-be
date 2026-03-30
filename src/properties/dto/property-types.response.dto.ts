import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { propertyTypeEnumValues, type PropertyType } from 'src/db/schema';

export class PropertyTypesResponseDto {
  @Expose()
  @ApiProperty({ example: propertyTypeEnumValues, isArray: true })
  @Type(() => String)
  data: PropertyType[];
}
