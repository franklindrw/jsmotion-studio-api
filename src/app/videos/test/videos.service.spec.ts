import { Test, TestingModule } from '@nestjs/testing';
import { VideoRepository } from '../videos.repository';
import { VideoService } from '../videos.service';
import { CreateVideoDto } from '../dtos/create-video.dto';

describe('VideosService', () => {
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
    expect(repo.create).toHaveBeenCalledWith(data); // toHaveBeenCalledWith compara se o método foi chamado com os parâmetros corretos
  });

  it('should not call create method with incorect data', async () => {
    try {
      await service.createVideo(dataError);
    } catch (e) {
      expect(e.message).toBe('Invalid data');
    }

    expect(repo.create).not.toHaveBeenCalled(); // toHaveBeenCalled compara se o método foi chamado
  });

  it('should return a video when repository create a video', async () => {
    repo.create.mockResolvedValue(createdVideo);

    const video = await service.createVideo(data);

    expect(video).toMatchObject(data); // toMatchObject compara se os objetos possuem as mesmas propriedades
  });

  it('should throw an error when repository fails to create a video', async () => {
    repo.create.mockRejectedValue(new Error('Repository error'));

    await expect(service.createVideo(data)).rejects.toThrow('Repository error'); // toThrow compara se a mensagem de erro é a mesma
  });
});
