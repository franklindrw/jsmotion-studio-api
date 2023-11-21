import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoDto } from './dtos/video.dto';
import { VideoRepository } from './videos.repository';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepo: VideoRepository) {}

  async getVideos(): Promise<VideoDto[]> {
    return this.videoRepo.findAll();
  }

  async createVideo(data: CreateVideoDto): Promise<VideoDto> {
    const { title, description, category, url } = data;

    if (!title || !description || !category || !url) {
      throw new BadRequestException('Invalid data');
    }

    return this.videoRepo.create(data);
  }

  async getVideoById(id: number): Promise<VideoDto> {
    const video = await this.videoRepo.findById(id);

    if (!video) {
      throw new BadRequestException('Não há vídeos cadastrados');
    }

    return video;
  }

  async getVideosByCategory(category: string): Promise<VideoDto[]> {
    const videos = await this.videoRepo.findByCategory(category);

    if (!videos || videos.length === 0) {
      throw new BadRequestException('Não há vídeos cadastrados');
    }

    return videos;
  }

  async updateVideo(
    id: number,
    data: Partial<CreateVideoDto>,
  ): Promise<VideoDto> {
    // verifica se o vídeo existe
    const video = await this.videoRepo.findById(id);

    if (!video) {
      throw new BadRequestException('Não há vídeos cadastrados');
    }

    // verifica se os dados são válidos e atualiza o vídeo no banco
    return this.videoRepo.update(id, data);
  }

  async deleteVideo(id: number): Promise<VideoDto> {
    // verifica se o vídeo existe
    const video = await this.videoRepo.findById(id);

    if (!video) {
      throw new BadRequestException('Não há vídeos cadastrados');
    }

    // deleta o vídeo do banco
    return this.videoRepo.delete(id);
  }
}
