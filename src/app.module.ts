import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './properties/properties.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, PropertiesModule],
})
export class AppModule {}
