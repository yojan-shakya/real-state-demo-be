import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './properties/properties.module';
import { DatabaseModule } from './db/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DelayInterceptor } from './common/interceptor';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, PropertiesModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DelayInterceptor,
    },
  ],
})
export class AppModule {}
