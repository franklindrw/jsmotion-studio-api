import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoDto } from './dtos/video.dto';
import { VideoRepository } from './videos.repository';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepo: VideoRepository) {}

  async createVideo(data: CreateVideoDto): Promise<VideoDto> {
    const { title, description, category, url } = data;

    if (!title || !description || !category || !url) {
      throw new BadRequestException('Invalid data');
    }

    return this.videoRepo.create(data);
  }
}
