import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TradeModule } from './trade/trade.module';

import { validate } from './configuration/env.validation';
import configuration from './configuration/env.config';

@Module({
  imports: [
    TradeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validate,
    }),
  ],
})
export class AppModule {}
