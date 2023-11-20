import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideoService } from './videos.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VideoRepository } from './videos.repository';

@Module({
  imports: [],
  controllers: [VideosController],
  providers: [VideoService, PrismaService, VideoRepository],
})
export class VideosModule {}
