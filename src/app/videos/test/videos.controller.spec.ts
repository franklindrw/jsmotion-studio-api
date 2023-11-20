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
            getVideos: jest.fn(),
            getVideoById: jest.fn(),
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

  it('should return a list of videos when no videoId is provided', async () => {
    const videos = [{}]; // substitua por seus dados de vídeo
    (service.getVideos as jest.Mock).mockResolvedValue(videos);

    expect(await controller.getVideos()).toEqual(videos);
  });

  it('should return a video by id when videoId is provided', async () => {
    const video = {
      id: 1,
      title: 'test title',
      description: 'video test description data',
      category: 'test category',
      url: 'https://www.test.com/video-test-data',
      createdAt: new Date('2023-11-20T04:06:20.363Z'),
      updatedAt: new Date('2023-11-20T04:06:20.363Z'),
    };

    (service.getVideoById as jest.Mock).mockResolvedValue(video);

    expect(await controller.getVideos(1)).toEqual([video]);
  });

  it('should return an empty array when no videos are found', async () => {
    (service.getVideos as jest.Mock).mockResolvedValue([]);

    expect(await controller.getVideos()).toEqual([]);
  });

  it('should handle errors thrown by VideoService', async () => {
    (service.createVideo as jest.Mock).mockRejectedValue(new Error());
    await expect(controller.createVideo(data)).rejects.toThrow(); // compara se o método lançou um erro
  });
});
