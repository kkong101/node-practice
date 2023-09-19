import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ItemEntity } from './item.entity';
import { AlreadySoldException } from "../trade/dto/exception/already-sold.exception";

@Entity({ name: 'trade' })
export class TradeEntity extends BaseEntity {
  constructor() {
    super();
  }

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'sold_at', nullable: true })
  soldAt?: Date;

  // Nullable
  @OneToOne(() => UserEntity, (userEntity) => userEntity.itemEntities)
  @JoinColumn({ name: 'buyer_id' })
  buyer?: UserEntity;

  // Not Null
  @OneToOne(() => UserEntity, (userEntity) => userEntity.itemEntities)
  @JoinColumn({ name: 'seller_id' })
  seller: UserEntity;

  // Not Null
  @OneToOne(() => ItemEntity, (itemEntity) => itemEntity.trade)
  @JoinColumn({ name: 'item_id' })
  tradeItem: ItemEntity;

  sellByOrFail(buyer: UserEntity) {
    if (this.buyer != null) {
      throw new AlreadySoldException();
    }
    this.buyer = buyer;
  }

  isOwner(userId: number): boolean {
    return userId === this.seller.id;
  }

  static of(seller: UserEntity, item: ItemEntity, price: number): TradeEntity {
    const trade = new TradeEntity();
    trade.seller = seller;
    trade.soldAt = new Date();
    trade.tradeItem = item;
    trade.price = price;
    return trade;
  }

}
