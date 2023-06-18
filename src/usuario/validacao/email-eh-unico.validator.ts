import { Injectable } from '@nestjs/common';
import { usuarioRepository } from '../usuario.repository';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {
  constructor(private usuarioRepository: usuarioRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(
      value,
    );
    return !usuarioComEmailExiste;
  }
}
//Assim, se o usuário já existir (isto é, se usuarioComEmailExiste for true), o retorno será false e o cadastro não será finalizado.

//decorator - uma função que retorna outra função

export const emailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, prop: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: prop,
      options: opcoesDeValidacao,
      validator: EmailEhUnicoValidator,
      constraints: [],
    });
  };
};
