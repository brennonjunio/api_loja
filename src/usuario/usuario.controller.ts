import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { usuarioRepository } from './usuario.repository';
import { CriaUsuarioDto } from 'src/usuario/dto/CriaUsuario.dto';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDto } from './dto/ListaUsuario.dto';
import { atualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

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
      nome: usuarioEntity.nome,
      message: `usuario: ${usuarioEntity.nome} Criado Com sucesso`,
    };
  }
  @Get()

  //@body é um decorator que recebe os dados da requisição
  async listarUsuarios() {
    //apos instanciado, ira usar o metodo salvar para pegar os dados do usuario
    const usuariosSalvos = await this.usuarioRepository.listar();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
      //aqui os dados escolhidos para retornar do DTO
    );
    return usuariosLista;
  }

  @Put('/:id') //rota para atualizar os dados do usuario, abaixo passamos o @params que pega esse id
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() NovosDados: atualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(
      id,
      NovosDados,
    );
    return {
      message: `usuario:>>> ${usuarioAtualizado.nome} <<< atualizado com sucesso`,
    };
  }
}
