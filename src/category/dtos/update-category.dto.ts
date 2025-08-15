import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    description: 'Updated name of the category',
    example: 'Updated Electronics',
    required: true,
  })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @ApiProperty({
    description: 'Updated description of the category',
    example: 'Updated description of electronics category',
    required: true,
  })
  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  description: string;
}
