import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async create(data: CreateCategoryDto) {
    const { title, color } = data;

    if (!title || !color) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.categoryRepo.create(data);
  }

  async findAll() {
    const categories = await this.categoryRepo.findAll();

    if (!categories.length) {
      throw new HttpException(
        'Nao há categorias cadastradas',
        HttpStatus.NOT_FOUND,
      );
    }

    return categories;
  }

  async findById(id: number) {
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async findVideosByCategory(id: number) {
    const category = await this.categoryRepo.findVideosByCategory(id);

    if (!category || !category.length) {
      throw new HttpException(
        'Não há vídeos com essa categoria',
        HttpStatus.NOT_FOUND,
      );
    }

    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    // verifica se a categoria existe
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new HttpException(
        'Não há categoria cadastrada com esse id.',
        HttpStatus.NOT_FOUND,
      );
    }

    // verifica se os dados são válidos
    const { title, color } = data;
    if (!title || !color) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    // atualiza a categoria no banco de dados
    return await this.categoryRepo.update(id, data);
  }

  async remove(id: number) {
    // verifica se a categoria existe
    const category = await this.categoryRepo.findById(id);

    if (!category) {
      throw new HttpException(
        'Não há categoria cadastrada com esse id.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.categoryRepo.delete(id);
  }
}
