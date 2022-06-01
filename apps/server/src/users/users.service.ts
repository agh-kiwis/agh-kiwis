import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityCondition } from '../utils/types/entity-condition.type';

@Injectable()
export class UsersService {
  constructor(
    // TODO Make it Active Record pattern there
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.usersRepository.save(
      this.usersRepository.create(createUserInput)
    );
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
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
    await this.usersRepository.softDelete(id);
  }
}
