import { IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome não pode ficar vazio' })
  name: string;

  @IsNotEmpty({ message: 'Descrição não pode ficar vazia' })
  @MinLength(5, { message: 'Descrição deve ter pelo menos 5 caracteres' })
  description: string;
}
