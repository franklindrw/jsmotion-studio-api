import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Usuário 1',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'example@email.com',
  })
  email: string;

  @ApiHideProperty()
  password: string;

  @IsDate()
  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2021-07-01T00:00:00.000Z',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'Data de atualização do usuário',
    example: '2021-07-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
