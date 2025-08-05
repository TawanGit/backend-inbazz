import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Digite um email válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  password: string;
}
