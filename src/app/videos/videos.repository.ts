import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoDto } from './dtos/video.dto';

@Injectable()
export class VideoRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVideoDto): Promise<VideoDto> {
    return this.prisma.videos.create({
      data,
    });
  }
}
