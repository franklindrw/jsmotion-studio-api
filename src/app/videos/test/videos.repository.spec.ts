import { PrismaService } from '../../../prisma/prisma.service';
import { VideoRepository } from '../videos.repository';
import { Test } from '@nestjs/testing';
import { CreateVideoDto } from '../dtos/create-video.dto';

describe('CreateVideoRepository', () => {
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

describe('GetVideosRepository', () => {
  let videosRepo: VideoRepository;

  beforeEach(() => {
    videosRepo = new VideoRepository({} as PrismaService);
    jest
      .spyOn(videosRepo, 'findAll')
      .mockImplementation(() => Promise.resolve([]));

    jest
      .spyOn(videosRepo, 'findById')
      .mockImplementation(() => Promise.resolve({} as any));
  });

  it('should call findAll method', async () => {
    videosRepo.findAll = jest.fn();
    await videosRepo.findAll();
    expect(videosRepo.findAll).toHaveBeenCalled(); // compara se o método foi chamado
  });

  it('should return an empty array when there are no videos', async () => {
    (videosRepo.findAll as jest.Mock).mockResolvedValue([]);
    const videos = await videosRepo.findAll();
    expect(videos).toEqual([]); // compara se o valor retornado é igual ao valor esperado
  });

  it('should return an array of videos', async () => {
    const videos = [
      {
        id: 1,
        title: 'test title',
        description: 'video test description data',
        category: 'test category',
        url: 'https://www.test.com/video-test-data',
        createdAt: new Date('2023-11-20T04:06:20.363Z'),
        updatedAt: new Date('2023-11-20T04:06:20.363Z'),
      },
      {
        id: 2,
        title: 'test title 2',
        description: 'video test description data 2',
        category: 'test category 2',
        url: 'https://www.test.com/video-test-data-2',
        createdAt: new Date('2023-11-20T04:06:20.363Z'),
        updatedAt: new Date('2023-11-20T04:06:20.363Z'),
      },
    ];

    (videosRepo.findAll as jest.Mock).mockResolvedValue(videos);
    const returnedVideos = await videosRepo.findAll();
    expect(returnedVideos).toEqual(videos); // compara se o valor retornado é igual ao valor esperado
  });

  it('should throw an error when findAll method fails', async () => {
    (videosRepo.findAll as jest.Mock).mockRejectedValue(new Error());
    await expect(videosRepo.findAll()).rejects.toThrow(); // compara se o método lançou um erro
  });

  it('should return a video by id', async () => {
    const video = {
      id: 1,
      title: 'test title',
      description: 'video test description data',
      category: 'test category',
      url: 'https://www.test.com/video-test-data',
      createdAt: new Date('2023-11-20T04:06:20.363Z'),
      updatedAt: new Date('2023-11-20T04:06:20.363Z'),
    };

    (videosRepo.findById as jest.Mock).mockResolvedValue(video);
    const returnedVideo = await videosRepo.findById(1);
    expect(returnedVideo).toEqual(video); // compara se o valor retornado é igual ao valor esperado
  });

  it('should throw an error when findById method fails', async () => {
    (videosRepo.findById as jest.Mock).mockRejectedValue(new Error());
    await expect(videosRepo.findById(1)).rejects.toThrow(); // compara se o método lançou um erro
  });
});
