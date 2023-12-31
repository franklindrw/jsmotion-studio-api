import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoDto } from './dtos/video.dto';
import { VideoRepository } from './videos.repository';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepo: VideoRepository) {}

  async getVideos(): Promise<VideoDto[]> {
    return this.videoRepo.findAll();
  }

  async getVideosByTitle(title: string): Promise<VideoDto[]> {
    const videos = await this.videoRepo.findByTitle(title);

    if (!videos || !videos.length) {
      throw new HttpException(
        'Não há vídeos cadastrados',
        HttpStatus.NOT_FOUND,
      );
    }

    return videos;
  }

  async createVideo(data: CreateVideoDto): Promise<VideoDto> {
    const { title, description, category_id, url } = data;

    if (!title || !description || !category_id || !url) {
      throw new HttpException(
        'Informações obrigatórias não foram preenchidas',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.videoRepo.create(data);
  }

  async getVideoById(id: number): Promise<VideoDto> {
    const video = await this.videoRepo.findById(id);

    if (!video) {
      throw new HttpException('Vídeo não encontrado', HttpStatus.NOT_FOUND);
    }

    return video;
  }

  async updateVideo(
    id: number,
    data: Partial<CreateVideoDto>,
  ): Promise<VideoDto> {
    // verifica se o vídeo existe
    const video = await this.videoRepo.findById(id);

    if (!video) {
      throw new HttpException('Vídeo não encontrado', HttpStatus.NOT_FOUND);
    }

    // verifica se os dados são válidos e atualiza o vídeo no banco
    return this.videoRepo.update(id, data);
  }

  async deleteVideo(id: number): Promise<VideoDto> {
    // verifica se o vídeo existe
    const video = await this.videoRepo.findById(id);

    if (!video) {
      throw new HttpException('Vídeo não encontrado', HttpStatus.NOT_FOUND);
    }

    // deleta o vídeo do banco
    return this.videoRepo.delete(id);
  }
}
