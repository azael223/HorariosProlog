import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Clase } from "./Clase";
import { Grupo } from "./Grupo";
import { Maestro } from "./Maestro";
import { Seleccion } from "./Seleccion";

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @ManyToMany(() => Maestro, (maestro) => maestro.materias)
  @JoinTable()
  maestros: Maestro[];

  @OneToMany(() => Seleccion, (seleccion) => seleccion.materia)
  selecciones: Seleccion[];

  @ManyToMany(() => Grupo, (grupo) => grupo.materias)
  @JoinTable()
  grupos: Grupo[];

  @OneToMany(() => Clase, (clase) => clase.materia)
  clases: Clase[];
}
