import { Module } from '@nestjs/common';
import { usuarioController } from './usuario.controller';
import { usuarioRepository } from './usuario.repository';
//criação e exportação do module de usuarios
@Module({
  controllers: [usuarioController],
  //providers - No NestJS, um provider é basicamente qualquer classe que esteja decorada com o decorator @Injectable
  providers: [usuarioRepository],
})
export class usuarioModule {}
