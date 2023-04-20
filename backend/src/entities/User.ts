import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Grupo } from "./Grupo";

@Entity({ name: "usuario" })
export class User {
  // define a chave primária como auto incremento
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: false, length: 70 })
  mail: string;

  @Column({ nullable: false, unique: false, length: 250 })
  password: string;

  @OneToOne((type) => Grupo, { onDelete: "CASCADE" })
  @JoinColumn({
    name: "id_grupo",
    referencedColumnName: "id", //id da entidade Usuario
    foreignKeyConstraintName: "fk_id_grupo_usuario",
  })
  grupo: Grupo;
}
