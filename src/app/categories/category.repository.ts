import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { VideoDto } from '../videos/dtos/video.dto';

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

  async findVideosByCategory(id: number): Promise<VideoDto[]> {
    // lista todos os videos com o id da categoria
    const data = await this.prisma.categories.findUnique({
      where: { id },
      include: {
        videos: true,
      },
    });

    if (!data) {
      return null;
    }

    return data.videos;
  }

  async create(data: CreateCategoryDto): Promise<CategoryDto> {
    return this.prisma.categories.create({
      data,
    });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<CategoryDto> {
    return await this.prisma.categories.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return await this.prisma.categories.delete({
      where: { id },
    });
  }
}
