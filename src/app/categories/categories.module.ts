import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './category.repository';

@Module({
  controllers: [CategoriesController],
  providers: [PrismaService, CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
