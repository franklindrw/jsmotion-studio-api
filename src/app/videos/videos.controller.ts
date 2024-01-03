import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVideoDto } from './dtos/create-video.dto';
import { VideoService } from './videos.service';
import { VideoDto } from './dtos/video.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiPaginatedResponse } from 'src/decorators/paginated.decorator';
import { PaginatedOutputDto } from './dtos/paginated-video.dto';

@ApiTags('videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiPaginatedResponse(VideoDto)
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({
    status: 200,
    description: 'Retornou a lista de vídeos com sucesso.',
    type: [VideoDto],
  })
  @ApiResponse({ status: 404, description: 'Não há vídeos cadastrados.' })
  async getVideos(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<PaginatedOutputDto<VideoDto[]>> {
    if (search) {
      const videos = await this.videoService.getVideosByTitle(
        search,
        page,
        limit,
      );
      return videos;
    }
    const videos = await this.videoService.getVideos(page, limit);
    return videos;
  }

  @Get('free')
  @ApiResponse({
    status: 200,
    description: 'Retornou a lista de vídeos com sucesso.',
    type: [VideoDto],
  })
  @ApiResponse({ status: 404, description: 'Não há vídeos cadastrados.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async getVideosFree(): Promise<VideoDto[]> {
    return await this.videoService.getVideosFree();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Retornou o vídeo com sucesso.',
    type: VideoDto,
  })
  @ApiResponse({ status: 404, description: 'Vídeo não encontrado.' })
  async getVideo(@Param('id') id: number): Promise<VideoDto> {
    return await this.videoService.getVideoById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    return await this.videoService.createVideo(newVideoData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
    return await this.videoService.updateVideo(id, videoData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'O Vídeo foi deletado com sucesso.',
    type: VideoDto,
  })
  @ApiResponse({ status: 404, description: 'Vídeo não encontrado.' })
  async deleteVideo(@Param('id') id: number): Promise<VideoDto> {
    return await this.videoService.deleteVideo(id);
  }
}
