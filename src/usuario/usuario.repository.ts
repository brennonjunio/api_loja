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
  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return possivelUsuario !== undefined;
  }
}
/*Assim, se o find() não encontrar um usuário com e-mail igual ao passado como parâmetro, o valor de possivelUsuario será undefined e 
retornaremos false. Se possivelUsuario não for undefined,]
significa que já existe um usuário no nosso array com esse e-mail, então o retorno será true.*/
