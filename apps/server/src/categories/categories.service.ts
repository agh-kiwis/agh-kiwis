import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CustomValidationErrors } from '../utils/CustomValidationError';
import { sanitizeInput } from '../utils/sanitizers/inputSanitizer';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
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
    return await Category.find({
      where: {
        user: user,
        // TODO This seems to be case sensitive, maybe we want it not to be
        name: Like(`${sanitizedPrefix}%`),
      },
    });
  }

  update(user: User, id: number, updateCategoryInput: UpdateCategoryInput) {
    // TODO
    return `This action updates a #${id} category`;
  }

  remove(user: User, id: number) {
    // TODO
    return `This action removes a #${id} category`;
  }
}
