import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VideoDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do video',
    example: 1,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Título do video',
    example: 'Video 1',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descrição do video',
    example: 'descricao para o video 1',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Categoria do video',
    example: 'categoria 1',
  })
  category: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL do video',
    example: 'https://www.youtube.com/watch?v=1',
  })
  url: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Data de criação do video',
    example: '2023-11-20T04:06:20.363Z',
  })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Data de ultima atualização',
    example: '2023-11-20T04:06:20.363Z',
  })
  updatedAt: Date;
}
