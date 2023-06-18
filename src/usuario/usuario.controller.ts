import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { usuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from 'src/usuario/dto/CriaUsuario.dto';
import { v4 as uuid } from 'uuid';

@Controller('usuarios')
export class usuarioController {
  //instanciando usuario para salva-lo

  constructor(private usuarioRepository: usuarioRepository) {}
  //metodo
  @Post()

  //@body é um decorator que recebe os dados da requisição
  //adicionando o CriarUsuarioDto para validar os campos
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDto) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();
    //apos instanciado, ira usar o metodo salvar para pegar os dados do usuario
    this.usuarioRepository.salvar(usuarioEntity);
    return {
      id: usuarioEntity.id,
      message: `usuario: ${usuarioEntity.nome} Criado Com sucesso`,
    };
  }
  @Get()

  //@body é um decorator que recebe os dados da requisição
  async listarUsuarios() {
    //apos instanciado, ira usar o metodo salvar para pegar os dados do usuario
    return this.usuarioRepository.listar();
  }
}
