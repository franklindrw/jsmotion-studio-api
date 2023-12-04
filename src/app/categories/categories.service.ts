import { BadRequestException, Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all categories`;
  }

  findById(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, data: UpdateCategoryDto) {
    return { message: `This action updates a #${id} category`, data };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
