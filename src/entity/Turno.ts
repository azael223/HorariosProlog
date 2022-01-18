import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Grupo } from "./Grupo";

@Entity()
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @Column({ type: "int" })
  hora_inicio: number;

  @Column({ type: "int" })
  hora_fin: number;

  @OneToMany(() => Grupo, (grupo) => grupo.turno)
  grupos: Grupo[];
}
