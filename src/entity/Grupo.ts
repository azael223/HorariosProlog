import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Clase } from "./Clase";
import { Maestro } from "./Maestro";
import { Turno } from "./Turno";

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @ManyToOne(() => Turno, (turno) => turno.grupos)
  turno: Turno;

  @OneToMany(() => Clase, (clase) => clase.materia)
  clases: Clase[];

  @ManyToMany(() => Maestro, (maestro) => maestro.grupos)
  maestros: Maestro[];
}
