import { EntityManager, Repository } from 'typeorm';
import { ItemEntity } from '../../entity/item.entity';
import { CustomRepository } from '../../database/repository/repository.decorator';
import { NotFoundItemException } from '../dto/exception/not-found-item.exception';

@CustomRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity> {

  async saveWithTransaction(entityManager: EntityManager, item: ItemEntity): Promise<void> {
    await entityManager.save(item, { transaction: true });
  }

  async getItem(itemId: number): Promise<ItemEntity> {
    const item = await this.findOneBy({ id: itemId });
    if (!item) throw new NotFoundItemException();
    return item;
  }

  async getItemWithUser(itemId: number): Promise<ItemEntity> {
    const user = await this.findOne({
      where: { id: itemId },
      relations: { user: true },
    });
    if (!user) throw new NotFoundItemException();
    return user;
  }

  async getTradingItemsById(id) {
    await this.createQueryBuilder('item')
      .leftJoinAndSelect('item.trade', 'trade')
      .where('item.id = :id', { id })
      .getMany();
  }

}
