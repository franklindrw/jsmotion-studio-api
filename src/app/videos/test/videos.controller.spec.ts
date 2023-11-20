import { Test } from '@nestjs/testing';
import { VideosController } from '../videos.controller';
import { VideoService } from '../videos.service';
import { CreateVideoDto } from '../dtos/create-video.dto';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideoService;

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
      controllers: [VideosController],
      providers: [
        {
          provide: VideoService,
          useValue: {
            createVideo: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideoService>(VideoService);
  });

  it('should return the created video', async () => {
    (service.createVideo as jest.Mock).mockResolvedValue(createdVideo);
    const video = await controller.createVideo(data);
    expect(video).toMatchObject(createdVideo); // compara se o valor retornado é igual ao valor esperado
  });

  it('should handle errors thrown by VideoService', async () => {
    (service.createVideo as jest.Mock).mockRejectedValue(new Error());
    await expect(controller.createVideo(data)).rejects.toThrow(); // compara se o método lançou um erro
  });
});
