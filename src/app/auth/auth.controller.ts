import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário logado com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Usuário ou senha inválidos.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
  async login(@Body() loginUser: LoginDto) {
    return await this.authService.signIn(loginUser);
  }
}
