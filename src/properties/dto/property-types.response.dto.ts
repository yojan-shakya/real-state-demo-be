import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { propertyTypeEnum, type PropertyType } from 'src/db/schema';

export class PropertyTypesResponseDto {
  @Expose()
  @ApiProperty({ example: propertyTypeEnum.enumValues, isArray: true })
  @Type(() => String)
  data: PropertyType[];
}
