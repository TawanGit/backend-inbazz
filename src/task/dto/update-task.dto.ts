import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsInt,
} from 'class-validator';
import { TaskStatus } from 'generated/prisma';

export class UpdateTaskDto {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O título deve ser uma string (texto)' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  title: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string (texto)' })
  @MinLength(5, { message: 'A descrição deve ter no mínimo 5 caracteres' })
  description: string;

  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsEnum(TaskStatus, { message: 'Status inválido' })
  status: TaskStatus;

  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsInt({ message: 'A categoria deve ser um número inteiro' })
  categoryId: number;
}
