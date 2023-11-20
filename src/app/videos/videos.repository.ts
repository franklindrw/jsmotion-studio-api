import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
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

  async findAll(): Promise<VideoDto[]> {
    return this.prisma.videos.findMany();
  }

  async findById(id: number): Promise<VideoDto> {
    return this.prisma.videos.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCategory(category: string): Promise<VideoDto[]> {
    return this.prisma.videos.findMany({
      where: {
        category,
      },
    });
  }
}
