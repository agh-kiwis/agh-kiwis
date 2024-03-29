import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { Injectable } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { Color } from '../categories/entities/color.entity';
import { InitialSeed } from '../database/initial-seed';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserInput: CreateUserInput) {
    const user: User = await User.create({ ...createUserInput }).save();

    for (const [index, color] of InitialSeed.colors.entries()) {
      await Category.create({
        color: await Color.findOne({ where: { hexCode: color } }),
        name: InitialSeed.categories[index],
        user: user,
      }).save();
    }

    return user;
  }

  findOne(fields: FindOptionsWhere<User>) {
    return User.findOneBy(fields);
  }

  async update(user: User, updateUserInput: UpdateUserInput) {
    await User.update(user.id, updateUserInput);

    return await User.findOne({
      where: {
        id: updateUserInput.id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async softDelete(id: number): Promise<void> {
    await User.delete(id);
  }
}
