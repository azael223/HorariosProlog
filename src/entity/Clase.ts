import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Grupo } from "./Grupo";
import { Maestro } from "./Maestro";
import { Materia } from "./Materia";

@Entity()
export class Clase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Grupo, (grupo) => grupo.clases)
  grupo: Grupo;

  @ManyToOne(() => Materia, (materia) => materia.clases)
  materia: Materia;

  @ManyToOne(() => Maestro, (maestro) => maestro.clases)
  @JoinTable()
  maestro: Maestro;
}
