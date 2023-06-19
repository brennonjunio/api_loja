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
  //nossos dados de atualização, vão receber uma amostra Partial do nosso usuari Entity, os torna opcionais
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    const possivelUsuario = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );
    if (!possivelUsuario) {
      throw new Error('Usuario Não existe');
    }

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      //devolve um array, onde a chave do objeto vai virar outro array
      if (chave == id) {
        return;
      }
      possivelUsuario[chave] = valor;
    });
    return possivelUsuario;
  }
}
