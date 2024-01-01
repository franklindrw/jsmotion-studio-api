import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<UserDto[]> {
    // busca todos os usuários no banco de dados
    const users = await this.prisma.users.findMany();

    // remove a senha de todos os usuários antes de retornar
    users.forEach((user) => delete user.password);

    return users;
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    // busca o usuário no banco de dados
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    // remove a senha do usuário antes de retornar
    delete user.password;

    return user;
  }

  async findById(id: number): Promise<UserDto> {
    // busca o usuário no banco de dados
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    // remove a senha do usuário antes de retornar
    delete user.password;

    return user;
  }

  async create(data: CreateUserDto): Promise<UserDto> {
    // cria o usuário no banco de dados
    const newUser = await this.prisma.users.create({
      data,
    });

    // remove a senha do usuário antes de retornar
    delete newUser.password;

    return newUser;
  }
}
