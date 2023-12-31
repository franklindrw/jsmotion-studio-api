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

  async update(id: number, data: Partial<CreateVideoDto>): Promise<VideoDto> {
    // verifica se o vídeo existe
    const video = await this.prisma.videos.findUnique({
      where: {
        id,
      },
    });

    if (!video) {
      throw new Error('Video not found');
    }

    // atualiza o vídeo no banco de dados
    return this.prisma.videos.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<VideoDto> {
    // verifica se o vídeo existe
    const video = await this.prisma.videos.findUnique({
      where: {
        id,
      },
    });

    if (!video) {
      throw new Error('Video not found');
    }

    // deleta o vídeo do banco de dados
    return this.prisma.videos.delete({
      where: {
        id,
      },
    });
  }
}
