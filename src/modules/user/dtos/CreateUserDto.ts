import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'Digite um email válido' })
  email: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @IsStrongPassword({}, { message: 'Digite uma senha forte' })
  password: string;
}
