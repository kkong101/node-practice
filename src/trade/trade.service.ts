import { Inject, Injectable } from "@nestjs/common";
import { ItemRepository } from './repository/item.repository';
import { UserRepository } from './repository/user.repository';
import { TradeEntity } from '../entity/trade.entity';
import { TradeRepository } from './repository/trade.repository';
import { DataSource, EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { SellingItemResponse } from './dto/response/selling-items.response';
import { WrongAccessException } from './dto/exception/wrong-access.exception';
import { AlreadySellingStateException } from './dto/exception/already-selling-state.exception';
import { RedisClientType } from "redis";

@Injectable()
export class TradeService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly userRepository: UserRepository,
    private readonly tradeRepository: TradeRepository,
    @InjectDataSource() private dataSource: DataSource,
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
  ) {}

  async sellItem(
    queryRunnerManager: EntityManager,
    sellerId: number,
    itemId: number,
    price: number,
  ): Promise<void> {
    const seller = await this.userRepository.getUser(sellerId);
    const item = await this.itemRepository.getItemWithUser(itemId);

    if (!item.isOwner(seller)) throw new WrongAccessException();
    if (await this.tradeRepository.isSellingState(sellerId, itemId)) {
      throw new AlreadySellingStateException();
    }

    const tradeSelling = TradeEntity.of(seller, item, price);
    await this.tradeRepository.saveWithTransaction(queryRunnerManager, tradeSelling);
  }

  async buyItem(
    queryRunnerManager: EntityManager,
    buyerId: number,
    tradeId: number,
  ): Promise<void> {

    const trade = await this.tradeRepository.getTradeWithPessimisticLock(
      this.dataSource,
      tradeId,
    );

    if (trade.isOwner(buyerId)) throw new WrongAccessException();

    const buyer = await this.userRepository.getUser(buyerId);
    const item = await this.itemRepository.getItem(trade.tradeItem.id);

    trade.sellByOrFail(buyer);
    buyer.minusBalanceOrFail(trade.price);
    item.transferItemOwnership(buyer);

    await this.itemRepository.saveWithTransaction(queryRunnerManager, item);
    await this.tradeRepository.saveWithTransaction(queryRunnerManager, trade);
    await this.userRepository.saveWithTransaction(queryRunnerManager, buyer);
  }

  async getTradingItems(itemId: number): Promise<SellingItemResponse[]> {
    return await this.tradeRepository.findSellingItems(itemId);
  }

}
