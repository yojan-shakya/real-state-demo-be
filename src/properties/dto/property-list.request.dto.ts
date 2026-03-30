import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.request.dto';
import { type PropertyType, propertyTypeEnumValues } from 'src/db/schema';

export class PropertyListRequestDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceMax?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  beds?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  baths?: number;

  @IsOptional()
  @IsIn(propertyTypeEnumValues)
  propertyType?: PropertyType;

  @IsOptional()
  @IsString()
  suburb?: string;
}
