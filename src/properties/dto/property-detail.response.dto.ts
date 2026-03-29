import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { propertyTypeEnum, type PropertyType } from 'src/db/schema';

export class PropertyDetailResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: string;

  @Expose()
  bedrooms: number;

  @Expose()
  bathrooms: number;

  @Expose()
  suburbs: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @ApiProperty({ enum: propertyTypeEnum.enumValues })
  propertyType: PropertyType;
}
