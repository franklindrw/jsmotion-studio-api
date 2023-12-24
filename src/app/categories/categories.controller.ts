import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({
    status: 201,
    description: 'A categoria foi criado com sucesso.',
    type: CategoryDto,
  })
  @ApiResponse({ status: 422, description: 'Dados enviados são inválidos.' })
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateCategoryDto) {
    try {
      const category = this.categoriesService.create(data);
      return category;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retornou a lista de categorias com sucesso.',
    type: [CategoryDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Não há categorias cadastradas cadastrados.',
  })
  async getCategories(): Promise<CategoryDto[]> {
    try {
      const categories = this.categoriesService.findAll();
      return categories;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retornou a categoria com sucesso.',
    type: CategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Não há categorias cadastradas cadastrados.',
  })
  findOne(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoriesService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
