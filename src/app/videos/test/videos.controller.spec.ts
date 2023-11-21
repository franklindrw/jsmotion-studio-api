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
            getVideosByCategory: jest.fn(),
            updateVideo: jest.fn(),
            deleteVideo: jest.fn(),
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

    expect(await controller.getVideo(1)).toEqual(video);
  });

  it('should return a list of videos by category when category is provided', async () => {
    const videos = [
      {
        id: 1,
        title: 'test title',
        description: 'video test description data',
        category: 'test',
        url: 'https://www.test.com/video-test-data',
        createdAt: new Date('2023-11-20T04:06:20.363Z'),
        updatedAt: new Date('2023-11-20T04:06:20.363Z'),
      },
    ];

    (service.getVideosByCategory as jest.Mock).mockResolvedValue(videos);

    expect(await controller.getVideosByCategory('test')).toEqual(videos);
  });

  it('should return an empty array when no videos are found', async () => {
    (service.getVideos as jest.Mock).mockResolvedValue([]);

    expect(await controller.getVideos()).toEqual([]);
  });

  it('should return an updated video', async () => {
    const updatedVideo = {
      description: 'video test description data',
      category: 'test category',
      url: 'https://www.test.com/video-test-data',
    };

    (service.updateVideo as jest.Mock).mockResolvedValue(updatedVideo);

    expect(await controller.updateVideo(1, data)).toEqual(updatedVideo);
  });

  it('should return a deleted video', async () => {
    const deletedVideo = {
      id: 1,
      title: 'test title',
      description: 'video test description data',
      category: 'test category',
      url: 'https://www.test.com/video-test-data',
      createdAt: new Date('2023-11-20T04:06:20.363Z'),
      updatedAt: new Date('2023-11-20T04:06:20.363Z'),
    };

    (service.deleteVideo as jest.Mock).mockResolvedValue(deletedVideo);

    expect(await controller.deleteVideo(1)).toEqual(deletedVideo);
  });

  it('should handle errors thrown by VideoService', async () => {
    (service.createVideo as jest.Mock).mockRejectedValue(new Error());
    await expect(controller.createVideo(data)).rejects.toThrow(); // compara se o método lançou um erro
  });
});
