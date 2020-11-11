import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class TokenInvalido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(
    () => Usuario,
    usuario => usuario.tokensInvalidados,
  )
  usuario: Usuario;
}
