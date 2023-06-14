import { Injectable } from '@nestjs/common';

@Injectable()
export class usuarioRepository {
  //criando um array para salvar os dados retornados do usuario, foi criado o metodo salvar para isso
  private usuarios = [];
  async salvar(usuario) {
    //insert no array>>
    this.usuarios.push(usuario);
  }

  async listar() {
    //listar usuarios
    return this.usuarios;
  }
}
