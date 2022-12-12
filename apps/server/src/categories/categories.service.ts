import { Equal, Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { CustomValidationErrors } from '../utils/CustomValidationError';
import { sanitizeInput } from '../utils/sanitizers/inputSanitizer';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';
import { Color } from './entities/color.entity';

@Injectable()
export class CategoriesService {
  async create(user: User, createCategoryInput: CreateCategoryInput) {
    const color = await Color.findOne({
      where: { id: createCategoryInput.colorId },
    });
    if (!color)
      throw new CustomValidationErrors({
        errors: [
          {
            message: 'Color not found',
            field: 'color',
          },
        ],
      });

    const category = Category.create({
      color: color,
      user: user,
      name: createCategoryInput.name,
    });

    return Category.save(category);
  }

  async findByPrefix(user: User, prefix: string) {
    const sanitizedPrefix = sanitizeInput(prefix);

    return await Category.createQueryBuilder('category')
      .where('category.name ILIKE :prefix', { prefix: `${sanitizedPrefix}%` })
      .andWhere('category.userId = :userId', { userId: user.id })
      .getMany();
  }

  async getColors(user: User) {
    const userCategories: Category[] = await Category.find({
      where: {
        user: { id: user.id },
      },
    });

    return userCategories.map((category) => category.color);
  }

  async getCategories(user: User) {
    const userCategories: Category[] = await Category.find({
      where: {
        user: { id: user.id },
      },
    });

    return userCategories;
  }

  async remove(user: User, id: number) {
    const category = await Category.findOne({
      where: {
        user: { id: user.id },
        id: id,
      },
    });

    if (!category)
      throw new CustomValidationErrors({
        errors: [
          {
            message: 'Category not found',
            field: 'category',
          },
        ],
      });

    return Category.remove(category);
  }
}
