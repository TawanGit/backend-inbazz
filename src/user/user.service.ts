import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/dtos/CreateUserDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async findUser(email: string): Promise<User | null> {
    const user = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const userExists = await this.findUser(data.email);

    if (userExists) {
      throw new Error('Esse email já está cadastrado');
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashPassword },
    });
  }
}
