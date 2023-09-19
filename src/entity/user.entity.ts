import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ItemEntity } from './item.entity';
import { NotEnoughBalanceException } from "../trade/dto/exception/not-enough-balance.exception";

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  constructor() {
    super();
  }

  @Column({ name: 'balance', nullable: false, default: 0 })
  balance: number;

  @Column({ name: 'nickname', nullable: false, unique: true })
  nickname: string;

  @OneToMany(() => ItemEntity, (itemEntities) => itemEntities.user)
  itemEntities: ItemEntity[];

  minusBalanceOrFail(money: number) {
    const afterBalance = this.balance - money;
    if (afterBalance < 0) {
      throw new NotEnoughBalanceException();
    }
    this.balance = afterBalance;
  }
}
