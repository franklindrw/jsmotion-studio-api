import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoDto } from './dtos/video.dto';
import { VideoRepository } from './videos.repository';

@Injectable()
export class VideoService {
  constructor(private videoRepo: VideoRepository) {}

  async createVideo(data: CreateVideoDto): Promise<VideoDto> {
    return this.videoRepo.create(data);
  }
}
