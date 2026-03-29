import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PropertiesModule } from './properties/properties.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DelayInterceptor } from './common/interceptor';

@Module({
  imports: [ConfigModule.forRoot(), PropertiesModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DelayInterceptor,
    },
  ],
})
export class AppModule {}
