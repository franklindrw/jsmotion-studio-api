import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoDto {
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
}
