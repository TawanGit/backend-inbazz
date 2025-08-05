import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client/extension';
import { PrismaService } from 'src/database/prisma.service';
import { Task } from 'generated/prisma';

@Injectable()
export class TaskService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error('Usuário não existe');
    }

    const categoryId = createTaskDto.categoryId ?? 1;

    const category = await this.prisma.category.findFirst({
      where: {
        name: 'General',
      },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria com o ID ${categoryId} não existe.`,
      );
    }

    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        categoryId,
        userId,
      },
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    const category = await this.prisma.category.findUnique({
      where: { id: updateTaskDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Categoria com o ID ${updateTaskDto.categoryId} não existe.`,
      );
    }
    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status,
        category: {
          connect: { id: category.id },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
