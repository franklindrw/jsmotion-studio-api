import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/utils/cryptpass.util';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    // verifica se o usuário já existe
    const user = await this.usersRepo.findUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('Usuário já existe', HttpStatus.CONFLICT);
    }

    // criptografa a senha
    createUserDto.password = await hashPassword(createUserDto.password);

    // cria o usuário no banco de dados
    return await this.usersRepo.create(createUserDto);
  }

  async findAll() {
    // busca todos os usuários
    const users = await this.usersRepo.findAll();

    if (!users.length) {
      throw new HttpException(
        'Nenhum usuário encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return users;
  }

  async findByEmail(email: string) {
    // busca o usuário pelo email
    const user = await this.usersRepo.findUserByEmail(email);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return [user];
  }

  async findOne(id: number) {
    // busca o usuário pelo id
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    // verifica se o usuário existe
    const user = await this.usersRepo.findById(userId);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    // criptografa a senha
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    // atualiza o usuário
    await this.usersRepo.update(userId, updateUserDto);

    // retorna o usuário atualizado
    return await this.usersRepo.findById(userId);
  }

  async remove(id: number) {
    // verifica se o usuário existe
    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    // remove o usuário
    const message = await this.usersRepo.remove(id);

    // retorna a mensagem de sucesso
    return { message: message };
  }
}
