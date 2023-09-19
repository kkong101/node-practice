import { DataSource, EntityManager, Repository } from 'typeorm';
import { TradeEntity } from '../../entity/trade.entity';
import { CustomRepository } from '../../database/repository/repository.decorator';
import { SellingItemResponse } from '../dto/response/selling-items.response';
import { NotFoundTradeException } from '../dto/exception/not-found-trade.exception';
import { UserEntity } from '../../entity/user.entity';
import { ItemEntity } from '../../entity/item.entity';

@CustomRepository(TradeEntity)
export class TradeRepository extends Repository<TradeEntity> {

  async isSellingState(sellerId: number, itemId: number) : Promise<number> {
    return this.createQueryBuilder('trade')
      .innerJoin('trade.seller', 'user')
      .innerJoin('trade.tradeItem', 'item')
      .where('user.id', { id: sellerId })
      .andWhere('item.id', { id: itemId })
      .getCount();
  }

  async saveWithTransaction(entityManager: EntityManager, trade: TradeEntity): Promise<void> {
    await entityManager.save(trade, { transaction: true });
  }

  async getTradeWithPessimisticLock(
    dataSource: DataSource,
    tradeId: number,
  ): Promise<TradeEntity> {
    const results = await dataSource.query<TradeEntity>(
      `select * from trade where id = ${tradeId} limit 1 for update;`,
    );
    if (!results[0]) throw new NotFoundTradeException();
    const trade = new TradeEntity();
    trade.id = results[0].id;
    trade.createdAt = new Date(results[0].created_at);
    trade.updatedAt = new Date(results[0].updated_at);
    trade.deletedAt = results[0].deleted_at ? new Date(results[0].deleted_at) : null;
    trade.price = results[0].price;
    trade.buyer = results[0].buyer_id ? new UserEntity() : undefined;
    trade.seller = new UserEntity();
    trade.seller.id = results[0].seller_id;
    trade.tradeItem = new ItemEntity();
    trade.tradeItem.id = results[0].item_id;
    return trade;
  }

  async findSellingItems(itemId: number): Promise<SellingItemResponse[]> {
    const trades = await this.createQueryBuilder('trade')
      .select(['trade.id', 'trade.price', 'trade.soldAt', 'item.name'])
      .innerJoinAndSelect('trade.tradeItem', 'item')
      .innerJoinAndSelect('trade.seller', 'user')
      .where('item.id = :itemId', { itemId })
      .andWhere('trade.buyer is null')
      .getMany();

    const sellingItemResponses: SellingItemResponse[] = trades.map((trade) => ({
      tradingId: trade.id,
      itemName: trade.tradeItem.name,
      price: trade.price,
      seller: trade.seller.id,
      createdAt: trade.soldAt,
    }));

    return sellingItemResponses;
  }
}
