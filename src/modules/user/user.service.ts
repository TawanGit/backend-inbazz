import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/UserResponseDto';
import { CreateUserDto } from './dtos/CreateUserDto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;

  async findUser(email: string): Promise<User | null> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async createUser(data: CreateUserDto): Promise<UserResponseDto> {
    if (!data.email || !data.password || !data.name) {
      throw new BadRequestException('Name, email and password are required');
    }

    const userExists = await this.findUser(data.email);
    if (userExists) {
      throw new BadRequestException('This email is already registered');
    }

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
      },
    });

    return plainToInstance(UserResponseDto, user);
  }
}
