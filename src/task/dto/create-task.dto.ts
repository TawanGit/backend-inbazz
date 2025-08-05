import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { TaskStatus } from 'generated/prisma';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @IsString({ message: 'O título deve ser uma string (texto)' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  title: string;

  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string (texto)' })
  @MinLength(5, { message: 'A descrição deve ter no mínimo 5 caracteres' })
  description: string;

  status: TaskStatus | undefined;

  categoryId: number;
}
