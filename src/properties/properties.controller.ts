import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { GetPropertyListDto } from './dto/get-property-list.dto';

@Controller('listings')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  async filterListings(@Query() params: GetPropertyListDto) {
    return this.propertiesService.filterListings(params);
  }

  @Get(':id')
  async getListingById(@Param('id') id: string) {
    return this.propertiesService.getListingById(id);
  }
}
