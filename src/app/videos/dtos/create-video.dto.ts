import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id da categoria do video',
    example: '1',
  })
  category_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'URL do video',
    example: 'https://www.youtube.com/watch?v=1',
  })
  url: string;
}
