import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CategoryDto[]> {
    return await this.prisma.categories.findMany();
  }

  async findById(id: number): Promise<CategoryDto> {
    return await this.prisma.categories.findUnique({
      where: { id },
    });
  }

  async create(data: CreateCategoryDto): Promise<CategoryDto> {
    return this.prisma.categories.create({
      data,
    });
  }
}
