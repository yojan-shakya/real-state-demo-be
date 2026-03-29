import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { GetPropertyListDto } from './dto/get-property-list.dto';
import { IsAdmin } from 'src/lib/decorators';

@Controller('listings')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  async getPropertyList(@Query() params: GetPropertyListDto) {
    // todo remove this
    await new Promise((r) => setTimeout(r, 2000));
    return this.propertiesService.getPropertyList(params);
  }

  @Get(':id')
  async getListingById(@Param('id') id: string, @IsAdmin() isAdmin: boolean) {
    // todo remove this
    await new Promise((r) => setTimeout(r, 2000));
    return this.propertiesService.getPropertyById(id, isAdmin);
  }
}
