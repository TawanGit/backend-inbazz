import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'generated/prisma';

@Controller('todos')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    try {
      return await this.taskService.create(createTaskDto, req.user.userId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: TaskStatus,
  ) {
    //todos?categoryId=2&status=PENDING
    // exemplo acima
    try {
      return this.taskService.findAll(categoryId, status);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      return this.taskService.update(id, updateTaskDto);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
