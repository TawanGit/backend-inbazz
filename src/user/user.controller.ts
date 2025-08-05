import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'generated/prisma';
import { CreateUserDto } from 'src/dtos/CreateUserDto';

@Controller('user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }
}
