import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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
  async create(@Body() data: CreateCategoryDto) {
    return await this.categoriesService.create(data);
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
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Retornou a categoria com sucesso.',
    type: CategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Não há categoria cadastrada com esse id.',
  })
  findOne(@Param('id') id: string): Promise<CategoryDto> {
    return this.categoriesService.findById(+id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({
    status: 200,
    description: `A categoria foi atualizada com sucesso.`,
    type: CategoryDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Não há categoria cadastrada com esse id.',
  })
  @ApiResponse({ status: 422, description: 'Dados enviados são inválidos.' })
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    const category = await this.categoriesService.update(+id, data);
    return { message: `A categoria #${id} foi atualizada`, category };
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: `A categoria foi excluída com sucesso.`,
  })
  @ApiResponse({
    status: 404,
    description: 'Não há categoria cadastrada com esse id.',
  })
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(+id);
    return { message: `A categoria #${id} foi excluída` };
  }
}
