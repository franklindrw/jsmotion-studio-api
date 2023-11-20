import { PrismaService } from '../../../prisma/prisma.service';
import { VideoRepository } from '../videos.repository';
import { Test } from '@nestjs/testing';
import { CreateVideoDto } from '../dtos/create-video.dto';

describe('VideoRepository', () => {
  let repo: VideoRepository;
  let prisma: PrismaService;

  // Dados para teste
  const data: CreateVideoDto = {
    title: 'test title',
    description: 'video test description data',
    category: 'test category',
    url: 'https://www.test.com/video-test-data',
  };

  const createdVideo = {
    id: 1,
    ...data,
    createdAt: new Date('2023-11-20T04:06:20.363Z'),
    updatedAt: new Date('2023-11-20T04:06:20.363Z'),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        VideoRepository,
        {
          provide: PrismaService,
          useValue: {
            videos: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repo = module.get<VideoRepository>(VideoRepository);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should call create method with correct data', async () => {
    await repo.create(data);
    expect(prisma.videos.create).toHaveBeenCalledWith({ data }); // compara se o método foi chamado com os parâmetros corretos
  });

  it('should return the created video', async () => {
    (prisma.videos.create as jest.Mock).mockResolvedValue(createdVideo);
    const video = await repo.create(data);
    expect(video).toMatchObject(createdVideo); // compara se o valor retornado é igual ao valor esperado
  });

  it('should throw an error when create method fails', async () => {
    (prisma.videos.create as jest.Mock).mockRejectedValue(new Error());
    await expect(repo.create(data)).rejects.toThrow(); // compara se o método lançou um erro
  });
});
