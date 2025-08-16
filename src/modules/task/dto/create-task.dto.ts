import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../../../../generated/prisma';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task', description: 'Title of the task' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O título deve ser uma string (texto)' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  title: string;

  @ApiProperty({ example: 'House Tasks', description: 'Task description' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string (texto)' })
  @MinLength(5, { message: 'A descrição deve ter no mínimo 5 caracteres' })
  description: string;

  @ApiProperty({
    example: 'DONE',
    enum: TaskStatus,
    description: 'Task status',
  })
  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsEnum(TaskStatus, { message: 'O status deve ser PENDING ou DONE' })
  status: TaskStatus;

  @ApiProperty({ example: 1, description: 'ID of the category for the task' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsNumber({}, { message: 'A categoria deve ser um número' })
  categoryId: number;
}
