import { Test, TestingModule } from '@nestjs/testing';
import { VideoRepository } from '../videos.repository';
import { VideoService } from '../videos.service';
import { CreateVideoDto } from '../dtos/create-video.dto';
import { BadRequestException } from '@nestjs/common';

describe('CreateVideosService', () => {
  let service: VideoService;
  let repo: jest.Mocked<VideoRepository>;

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

  const dataError: CreateVideoDto = {
    title: '',
    description: 'video test description data',
    category: 'test category',
    url: 'https://www.test.com/video-test-data',
  };

  beforeEach(async () => {
    const repoMock = {
      create: jest.fn(),
    };

    // O método create do repositório será substituído por uma função mockada
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: VideoRepository,
          useValue: repoMock,
        },
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
    repo = module.get(VideoRepository);
  });

  it('should call create method with correct data', async () => {
    await service.createVideo(data);
    expect(repo.create).toHaveBeenCalledWith(data); // compara se o método foi chamado com os parâmetros corretos
  });

  it('should not call create method with incorect data', async () => {
    try {
      await service.createVideo(dataError);
    } catch (e) {
      expect(e.message).toBe('Invalid data');
    }

    expect(repo.create).not.toHaveBeenCalled(); // compara se o método foi chamado
  });

  it('should return a video when repository create a video', async () => {
    repo.create.mockResolvedValue(createdVideo);

    const video = await service.createVideo(data);

    expect(video).toMatchObject(data); // compara se os objetos possuem as mesmas propriedades
  });

  it('should throw an error when repository fails to create a video', async () => {
    repo.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createVideo(data)).rejects.toThrow('Repository error'); // compara se a mensagem de erro é a mesma
  });
});

describe('GetVideosService', () => {
  let videoService: VideoService;
  let videoRepo: VideoRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: VideoRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            findByCategory: jest.fn(),
          },
        },
      ],
    }).compile();

    videoService = moduleRef.get<VideoService>(VideoService);
    videoRepo = moduleRef.get<VideoRepository>(VideoRepository);
  });

  it('should call findAll method', async () => {
    await videoService.getVideos();
    expect(videoRepo.findAll).toHaveBeenCalled(); // compara se o método foi chamado
  });

  it('should return an array of videos', async () => {
    const result = [
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

    (videoRepo.findAll as jest.Mock).mockResolvedValue(result);

    expect(await videoService.getVideos()).toBe(result); // compara se o resultado é o mesmo
  });

  it('should return a video by id', async () => {
    const video = [
      {
        id: 1,
        title: 'test title',
        description: 'video test description data',
        category: 'test category',
        url: 'https://www.test.com/video-test-data',
        createdAt: new Date('2023-11-20T04:06:20.363Z'),
        updatedAt: new Date('2023-11-20T04:06:20.363Z'),
      },
    ]; // substitua por seus dados de vídeo
    (videoRepo.findById as jest.Mock).mockResolvedValue(video);

    expect(await videoService.getVideoById(1)).toBe(video); // compara se o resultado é o mesmo
  });

  it('should return a video by category', async () => {
    const video = [
      {
        id: 1,
        title: 'test title',
        description: 'video test description data',
        category: 'category-testing',
        url: 'https://www.test.com/video-test-data',
        createdAt: new Date('2023-11-20T04:06:20.363Z'),
        updatedAt: new Date('2023-11-20T04:06:20.363Z'),
      },
    ]; // substitua por seus dados de vídeo
    (videoRepo.findByCategory as jest.Mock).mockResolvedValue(video);

    expect(await videoService.getVideosByCategory('category-testing')).toBe(
      video,
    ); // compara se o resultado é o mesmo
  });

  it('should throw an error if no video is found by id', async () => {
    (videoRepo.findById as jest.Mock).mockResolvedValue(null);

    await expect(videoService.getVideoById(1)).rejects.toThrow(
      BadRequestException,
    ); // compara se a mensagem de erro é a mesma
  });
});
