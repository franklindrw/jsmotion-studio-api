import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  create(data: CreateCategoryDto) {
    const { title, color } = data;

    if (!title || !color) {
      throw new BadRequestException('Invalid data');
    }

    return this.categoryRepo.create(data);
  }

  async findAll() {
    const categories = await this.categoryRepo.findAll();

    if (!categories.length) {
      throw new BadRequestException('Categories not found');
    }

    return categories;
  }

  async findById(id: number) {
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  update(id: number, data: UpdateCategoryDto) {
    return { message: `This action updates a #${id} category`, data };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
