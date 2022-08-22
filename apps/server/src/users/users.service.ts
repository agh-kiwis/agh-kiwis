import { Injectable } from '@nestjs/common';
import { EntityCondition } from '../utils/types/entity-condition.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  create(createUserInput: CreateUserInput) {
    return User.create(createUserInput).save();
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(fields: EntityCondition<User>) {
    return User.findOne({
      where: fields,
    });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async softDelete(id: number): Promise<void> {
    await User.delete(id);
  }
}
