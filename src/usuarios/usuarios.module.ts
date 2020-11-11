import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { UsuariosStrategy } from './usuarios.strategy';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, UsuariosStrategy],
})
export class UsuariosModule {}
