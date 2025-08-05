import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;
  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  description: string;
}
