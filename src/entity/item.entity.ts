import { Column, ManyToOne, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { TradeEntity } from "./trade.entity";

@Entity({ name: 'item' })
export class ItemEntity extends BaseEntity {
  constructor() {
    super();
  }

  @Column({ name: 'name', nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.itemEntities)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(() => TradeEntity, (trade) => trade.tradeItem)
  trade?: TradeEntity;

  isOwner(user: UserEntity) {
    return user.id === this.user.id;
  }

  transferItemOwnership(buyer: UserEntity) {
    this.user = buyer;
  }

}
