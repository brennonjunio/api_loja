import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { emailEhUnico } from '../validacao/email-eh-unico.validator';
//Criando padrões dos campos
export class atualizaUsuarioDTO {
  @IsNotEmpty({
    message: 'Nome Não pode ser vazio',
  })
  @IsOptional()
  nome: string;

  @emailEhUnico({ message: 'já existe um usuario com este e-mail' })
  @IsOptional()
  @IsEmail(undefined, {
    message: 'Email Invalido',
  })
  email: string;

  @MinLength(6, {
    message: 'Senha Deve ter no minimo 6 caracteres',
  })
  @IsOptional()
  senha: string;
}
