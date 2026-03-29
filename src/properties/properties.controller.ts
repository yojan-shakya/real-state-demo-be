import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertyListRequestDto } from './dto/property-list.request.dto';
import { ADMIN_FLAG, IsAdmin } from 'src/common/decorators';
import { ApiHeader } from '@nestjs/swagger';

@Controller('property')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get('listings')
  async getPropertyList(@Query() params: PropertyListRequestDto) {
    return this.propertiesService.getPropertyList(params);
  }

  @Get('listings/:id')
  @ApiHeader({
    name: ADMIN_FLAG,
    required: false,
    description: 'Put true to simulate admin privileges',
    schema: { enum: ['true'] },
  })
  async getListingById(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    return this.propertiesService.getPropertyById(id, isAdmin);
  }

  @Get('property-types')
  async getPropertyTypes() {
    return this.propertiesService.getPropertyTypes();
  }
}
