import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryRepository;

  beforeEach(async () => {
    const categoryRepositoryMock = {
      create: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoryRepository,
          useValue: categoryRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const dto: CreateCategoryDto = { title: 'Test', color: 'Blue' };
    (categoryRepository.create as jest.Mock).mockResolvedValue(dto);
    expect(await service.create(dto)).toEqual(dto);
  });

  it('should throw BadRequestException when data is invalid', async () => {
    const dto: CreateCategoryDto = { title: '', color: '' };
    (categoryRepository.create as jest.Mock).mockRejectedValue(
      new BadRequestException('Invalid data'),
    );
    try {
      await service.create(dto);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });
});
