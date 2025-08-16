import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../../../generated/prisma';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title (minimum 3 characters)',
    example: 'Fix login bug',
  })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O título deve ser uma string (texto)' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Task description (minimum 5 characters)',
    example:
      'Fix issue causing login failure when password has special characters',
  })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string (texto)' })
  @MinLength(5, { message: 'A descrição deve ter no mínimo 5 caracteres' })
  description: string;

  @ApiProperty({
    description: 'Task status',
    enum: TaskStatus,
    example: TaskStatus.DONE,
  })
  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsEnum(TaskStatus, { message: 'Status inválido' })
  status: TaskStatus;

  @ApiProperty({
    description: 'Category ID for the task',
    example: 1,
  })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsInt({ message: 'A categoria deve ser um número inteiro' })
  categoryId: number;
}
