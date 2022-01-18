import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Grupo } from "./Grupo";
import { Materia } from "./Materia";
import { Seleccion } from "./Seleccion";

@Entity()
export class Maestro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @ManyToMany(() => Materia, (materia) => materia.maestros)
  @JoinTable()
  materias: Materia[];

  @ManyToMany(() => Grupo, (grupo) => grupo.maestros)
  @JoinTable()
  grupos: Grupo[];

  @OneToMany(() => Seleccion, (seleccion) => seleccion.maestro)
  selecciones: Seleccion[];
}
