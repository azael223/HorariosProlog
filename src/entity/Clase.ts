import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Grupo } from "./Grupo";
import { Materia } from "./Materia";

@Entity()
export class Clase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Grupo, (grupo) => grupo.clases)
  grupo: Grupo;

  @ManyToOne(() => Materia, (materia) => materia.clases)
  materia: Materia;

  @Column({ type: "int" })
  limiteSemana: number;
}
