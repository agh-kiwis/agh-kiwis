import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Color]), AuthModule],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
