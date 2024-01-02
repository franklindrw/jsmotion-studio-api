import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { comparePasswords } from 'src/utils/cryptpass.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(data: LoginDto) {
    // busca o usuário pelo email
    const findUser = await this.usersRepo.findUserByEmail(data.email);

    if (!findUser) {
      throw new HttpException(
        'Usuário ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // busca os dados do usuário
    const { password, ...result } = await this.usersRepo.findById(findUser.id);

    // verifica se a senha está correta
    const isPasswordValid = await comparePasswords(data.password, password);

    if (!isPasswordValid) {
      throw new HttpException(
        'Usuário ou senha inválidos',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      ...result,
      access_token: this.jwtService.sign({
        sub: result.id,
        username: result.name,
        email: result.email,
      }),
    };
  }
}
