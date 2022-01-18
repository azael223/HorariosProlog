import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Clase } from "./Clase";
import { Maestro } from "./Maestro";
import { Materia } from "./Materia";
import { Turno } from "./Turno";

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @ManyToOne(() => Turno, (turno) => turno.grupos)
  turno: Turno;

  @ManyToMany(() => Materia, (materia) => materia.maestros)
  @JoinTable()
  materias: Materia[];

  @ManyToMany(() => Maestro, (maestro) => maestro.grupos)
  @JoinTable()
  maestros: Maestro[];

  @OneToMany(() => Clase, (clase) => clase.grupo)
  clases: Clase[];
}
