import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindUserDto {
  @IsNotEmpty({ message: 'Digite um email válido' })
  email: string;
}
