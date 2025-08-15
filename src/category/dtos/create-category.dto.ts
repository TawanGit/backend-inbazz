import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of the category',
    example: 'Electronics',
  })
  @IsNotEmpty({ message: 'O nome não pode ficar vazio' })
  name: string;

  @ApiProperty({
    description: 'Detailed description of the category',
    example: 'All types of electronic devices and gadgets',
    minLength: 5,
  })
  @IsNotEmpty({ message: 'Descrição não pode ficar vazia' })
  @MinLength(5, { message: 'Descrição deve ter pelo menos 5 caracteres' })
  description: string;
}
