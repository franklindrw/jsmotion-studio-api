import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID da categoria',
    example: 1,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Título da categoria',
    example: 'Categoria 1',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'hash da cor da categoria',
    example: '#000000',
  })
  color: string;
}
