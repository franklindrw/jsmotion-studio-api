import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoService } from './videos.service';
import { VideoDto } from './dtos/video.dto';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiBody({ type: CreateVideoDto })
  @ApiResponse({
    status: 201,
    description: 'The video has been successfully created.',
  })
  @ApiResponse({ status: 422, description: 'Dados enviados são inválidos.' })
  @UsePipes(new ValidationPipe())
  async createVideo(@Body() newVideoData: CreateVideoDto): Promise<VideoDto> {
    try {
      const videoData = await this.videoService.createVideo(newVideoData);
      return videoData;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
