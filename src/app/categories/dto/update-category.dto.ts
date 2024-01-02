import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Título da categoria',
    example: 'Categoria 1',
    required: false,
  })
  title?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'hash da cor da categoria',
    example: '#000000',
    required: false,
  })
  color?: string;
}
