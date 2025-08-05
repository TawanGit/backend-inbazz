import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Digite um email válido' })
  email: string;

  @IsStrongPassword({}, { message: 'Digite uma senha válida' })
  password: string;
}
