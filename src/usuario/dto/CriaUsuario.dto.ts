import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { emailEhUnico } from '../validacao/email-eh-unico.validator';
//Criando padrões dos campos
export class CriaUsuarioDto {
  @IsNotEmpty({
    message: 'Nome Não pode ser vazio',
  })
  nome: string;

  @emailEhUnico({ message: 'já existe um usuario com este e-mail' })
  @IsEmail(undefined, {
    message: 'Email Invalido',
  })
  email: string;

  @MinLength(6, {
    message: 'Senha Deve ter no minimo 6 caracteres',
  })
  senha: string;
}

/*{
    message: 'O nome não pode ser vazio',
    
    padronização de mensagens de erro.

     @IsEmail(null, {
    message: 'O email Informado é invalido',
  })
    */
