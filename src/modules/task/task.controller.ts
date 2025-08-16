import {
  Controller,
  Get,
  Post,
  Body,
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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { TaskStatus } from '../../../generated/prisma';

@ApiTags('Tasks')
@Controller('todos')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Creates a new task for the authenticated user.',
  })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  @ApiResponse({
    status: 404,
    description: 'Category not found or other error.',
  })
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    try {
      return await this.taskService.create(createTaskDto, req.user.userId);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all tasks',
    description:
      'Fetch all tasks optionally filtered by categoryId and status.',
  })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: TaskStatus })
  @ApiResponse({ status: 200, description: 'Returns an array of tasks.' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  async findAll(
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: TaskStatus,
  ) {
    try {
      return this.taskService.findAll(categoryId, status);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get a task by ID',
    description: 'Fetch a single task by its ID.',
  })
  @ApiResponse({ status: 200, description: 'Returns the task.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a task',
    description: 'Updates a task by ID.',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task successfully updated.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Deletes a task by ID.',
  })
  @ApiResponse({ status: 200, description: 'Task successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(id);
  }
}
