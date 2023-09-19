import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RepositoryModule } from 'src/database/repository/repository.module';
import { UserRepository } from './repository/user.repository';
import { TradeController } from './trade.controller';
import { TradeService } from './trade.service';
import { ItemRepository } from './repository/item.repository';
import { TradeRepository } from './repository/trade.repository';
import { RedisModule } from '../database/redis.module';

@Module({
  imports: [
    RepositoryModule.forCustomRepository([UserRepository, ItemRepository, TradeRepository]),
    DatabaseModule,
    RedisModule,
  ],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
