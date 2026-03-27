import { Module } from '@nestjs/common';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [ListingsModule],
})
export class AppModule {}
