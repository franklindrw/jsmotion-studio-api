import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
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

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retornou a lista de vídeos com sucesso.',
    type: [VideoDto],
  })
  @ApiResponse({ status: 404, description: 'Não há vídeos cadastrados.' })
  async getVideos(): Promise<VideoDto[]> {
    try {
      const videos = await this.videoService.getVideos();
      return videos;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Retornou o vídeo com sucesso.',
    type: VideoDto,
  })
  @ApiResponse({ status: 404, description: 'Vídeo não encontrado.' })
  async getVideo(@Param('id') id: number): Promise<VideoDto> {
    try {
      const video = await this.videoService.getVideoById(id);
      return video;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/category/:category')
  @ApiResponse({
    status: 200,
    description: 'Retornou a lista de vídeos com sucesso.',
    type: [VideoDto],
  })
  @ApiResponse({ status: 404, description: 'Não há vídeos cadastrados.' })
  async getVideosByCategory(
    @Param('category') category: string,
  ): Promise<VideoDto[]> {
    try {
      const videos = await this.videoService.getVideosByCategory(category);
      return videos;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @ApiBody({ type: CreateVideoDto })
  @ApiResponse({
    status: 201,
    description: 'O Vídeo foi criado com sucesso.',
    type: VideoDto,
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

  @Put('/:id')
  @ApiBody({ type: CreateVideoDto })
  @ApiResponse({
    status: 200,
    description: 'O Vídeo foi atualizado com sucesso.',
    type: VideoDto,
  })
  @ApiResponse({ status: 404, description: 'Vídeo não encontrado.' })
  @ApiResponse({ status: 422, description: 'Dados enviados são inválidos.' })
  @UsePipes(new ValidationPipe())
  async updateVideo(
    @Param('id') id: number,
    @Body() videoData: Partial<CreateVideoDto>,
  ): Promise<VideoDto> {
    try {
      const video = await this.videoService.updateVideo(id, videoData);
      return video;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'O Vídeo foi deletado com sucesso.',
    type: VideoDto,
  })
  @ApiResponse({ status: 404, description: 'Vídeo não encontrado.' })
  async deleteVideo(@Param('id') id: number): Promise<VideoDto> {
    try {
      const video = await this.videoService.deleteVideo(id);
      return video;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
