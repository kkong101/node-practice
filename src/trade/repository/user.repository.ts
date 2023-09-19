import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';
import { CustomRepository } from '../../database/repository/repository.decorator';
import { UserNotFoundException } from '../dto/exception/not-found-user.exception';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async saveWithTransaction(entityManager: EntityManager, user: UserEntity): Promise<void> {
    await entityManager.save(user, { transaction: true });
  }

  async getUser(userId: number): Promise<UserEntity> {
    const user = await this.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();
    return user;
  }

}
