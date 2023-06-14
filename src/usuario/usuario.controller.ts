import { Body, Controller, Get, Post } from '@nestjs/common';
import { usuarioRepository } from './usuario.repository';

@Controller('usuarios')
export class usuarioController {
  //instanciando usuario para salva-lo

  constructor(private usuarioRepository: usuarioRepository) {}
  //metodo
  @Post()
  //@body é um decorator que recebe os dados da requisição
  async criaUsuario(@Body() dadosDoUsuario) {
    //apos instanciado, ira usar o metodo salvar para pegar os dados do usuario
    this.usuarioRepository.salvar(dadosDoUsuario);
    return dadosDoUsuario;
  }
  @Get()

  //@body é um decorator que recebe os dados da requisição
  async listarUsuarios() {
    //apos instanciado, ira usar o metodo salvar para pegar os dados do usuario
    return this.usuarioRepository.listar();
  }
}
