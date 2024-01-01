import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

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
}
