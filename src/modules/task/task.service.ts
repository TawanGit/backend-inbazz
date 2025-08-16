import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../database/prisma.service';
import { Task, TaskStatus } from 'generated/prisma';

@Injectable()
export class TaskService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    if (
      !createTaskDto.title ||
      !createTaskDto.description ||
      !createTaskDto.status ||
      !createTaskDto.categoryId
    ) {
      throw new BadRequestException(
        'All fields (title, description, status, categoryId) are required.',
      );
    }

    if (!['PENDING', 'DONE'].includes(createTaskDto.status)) {
      throw new BadRequestException('Invalid status. Must be PENDING or DONE.');
    }

    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException('User does not exist.');
    }

    const category = await this.prisma.category.findUnique({
      where: { id: createTaskDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createTaskDto.categoryId} does not exist.`,
      );
    }

    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        categoryId: createTaskDto.categoryId,
        userId,
      },
    });
  }

  async findAll(categoryId?: string, status?: TaskStatus) {
    const filters: any = {};

    if (categoryId) {
      filters.categoryId = Number(categoryId);
    }

    if (status) {
      if (!['PENDING', 'DONE'].includes(status)) {
        throw new BadRequestException(
          'Invalid status. Must be PENDING or DONE.',
        );
      }
      filters.status = status;
    }

    return this.prisma.task.findMany({ where: filters });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    if (
      updateTaskDto.status &&
      !['PENDING', 'DONE'].includes(updateTaskDto.status)
    ) {
      throw new BadRequestException('Invalid status. Must be PENDING or DONE.');
    }

    if (updateTaskDto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: updateTaskDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${updateTaskDto.categoryId} does not exist.`,
        );
      }
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status,
        ...(updateTaskDto.categoryId && {
          categoryId: updateTaskDto.categoryId,
        }),
      },
    });
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    return this.prisma.task.delete({ where: { id } });
  }
}
