import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CustomValidationErrors } from '../utils/CustomValidationError';
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
      ...createCategoryInput,
    });

    return this.categoryRepository.save(category);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
