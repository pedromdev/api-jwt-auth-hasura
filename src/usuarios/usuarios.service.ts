import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TipoUsuario } from './tipo.usuario';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async autenticar(
    email: string,
    senha: string,
    site: string,
  ): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({
      where: { email, site },
    });

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      return null;
    }

    return usuario;
  }

  login(usuario: Usuario): string {
    return this.jwtService.sign({
      sub: usuario.id,
      role: usuario.funcao,
      admin: usuario.funcao === TipoUsuario.ADMINISTRADOR,
      'https://hasura.io/jwt/claims': {
        'x-hasura-user-id': usuario.id,
        'x-hasura-role': usuario.funcao,
      },
    });
  }
}
