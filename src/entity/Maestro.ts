import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Clase } from "./Clase";
import { Grupo } from "./Grupo";

@Entity()
export class Maestro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @OneToMany(() => Clase, (clase) => clase.materia)
  clases: Clase[];

  @ManyToMany(() => Grupo, (grupo) => grupo.maestros)
  @JoinTable()
  grupos: Grupo[];
}
