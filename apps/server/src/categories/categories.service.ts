import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CustomValidationErrors } from '../utils/CustomValidationError';
import { sanitizeInput } from '../utils/sanitizers/inputSanitizer';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { Color } from './entities/color.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Color)
    private colorRepository: Repository<Color>
  ) {}

  async create(user: User, createCategoryInput: CreateCategoryInput) {
    const color = await this.colorRepository.findOne(
      createCategoryInput.colorId
    );
    if (!color)
      throw new CustomValidationErrors({
        errors: [
          {
            message: 'Color not found',
            field: 'color',
          },
        ],
      });

    const category = this.categoryRepository.create({
      color: color,
      user: user,
      name: createCategoryInput.name,
    });

    return this.categoryRepository.save(category);
  }

  async findByPrefix(user: User, prefix: string) {
    // TODO Extract sanitizer to utils
    const sanitizedPrefix = sanitizeInput(prefix);
    return await this.categoryRepository.find({
      where: {
        user: user,
        // TODO This seems to be case sensitive, maybe we want it not to be
        name: Like(`${sanitizedPrefix}%`),
      },
    });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
