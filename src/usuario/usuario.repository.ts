import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class usuarioRepository {
  //criando um array para salvar os dados retornados do usuario, foi criado o metodo salvar para isso
  private usuarios: UsuarioEntity[] = [];
  async salvar(usuario: UsuarioEntity) {
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
    /*Assim, se o find() não encontrar um usuário com e-mail igual ao passado como parâmetro,
       o valor de possivelUsuario será undefined e 
       retornaremos false. Se possivelUsuario não for undefined,]
       significa que já existe um usuário no nosso array com esse e-mail, então o retorno será true.*/
  }
  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );
    /*Assim, se um usuário for encontrado com o ID informado, o método buscaPorId() o retornará. Caso não seja encontrado, um erro será lançado.

Visto que recortamos parte do código do método atualiza(), vamos adaptá-lo a seguir. Nele, chamaremos o método buscaPorId() passando o ID e armazenaremos o
 retorno na constante usuario. Note que agora temos certeza de que o usuário existe, então não precisamos usar o termo "possível usuário":*/
    if (!possivelUsuario) {
      throw new Error('Usuario Não existe');
    }
    return possivelUsuario;
  }
  //nossos dados de atualização, vão receber uma amostra Partial do nosso usuari Entity, os torna opcionais
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      //devolve um array, onde a chave do objeto vai virar outro array
      if (chave == id) {
        return;
      }
      usuario[chave] = valor;
    });
    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter((usuarioSalvo) => {
      usuarioSalvo.id !== id;
    });
    return usuario;
  }
}
