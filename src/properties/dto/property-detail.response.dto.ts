import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  internalStatusEnumValues,
  propertyTypeEnumValues,
  type PropertyType,
} from 'src/db/schema';

export class AgentDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNo: string;
}

export class AdminMetadataDto {
  @Expose()
  id: number;

  @Expose()
  propertyId: number;

  @Expose()
  @ApiProperty({ enum: internalStatusEnumValues })
  internalStatus: 'fraud_suspected' | 'approved' | 'rejected' | 'under_review';

  @Expose()
  riskScore: number;
}
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
  @ApiProperty({ enum: propertyTypeEnumValues })
  propertyType: PropertyType;

  @Expose()
  agent: AgentDto;

  @Expose()
  @ApiProperty({ required: false })
  adminMetadata: AdminMetadataDto;
}
