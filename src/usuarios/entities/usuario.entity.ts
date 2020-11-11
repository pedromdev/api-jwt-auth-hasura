import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { TipoUsuario } from '../tipo.usuario';
import { TokenInvalido } from './token.invalido.entity';

@Entity()
@Index(['email', 'site'], { unique: true })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  site: string;

  @Column({
    type: 'enum',
    enum: TipoUsuario,
  })
  funcao: TipoUsuario;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @DeleteDateColumn()
  excluidoEm: Date;

  @VersionColumn()
  versao: number;

  @OneToMany(
    () => TokenInvalido,
    tokenInvalido => tokenInvalido.usuario,
  )
  tokensInvalidados: TokenInvalido[] = [];
}
