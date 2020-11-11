import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor(private usuariosService: UsuariosService) {
    super();
  }

  async validate(
    email: string,
    senha: string,
    @Req() request: Request,
  ): Promise<Usuario> {
    const site = request.headers['origin'] || request.headers['host'];
    const usuario = await this.usuariosService.autenticar(email, senha, site);

    if (!usuario) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos');
    }

    return usuario;
  }
}
