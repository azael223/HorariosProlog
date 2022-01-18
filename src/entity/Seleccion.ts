import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Maestro } from "./Maestro";
import { Materia } from "./Materia";

@Entity()
export class Seleccion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Maestro, (maestro) => maestro.selecciones)
  maestro: Maestro;

  @ManyToOne(() => Materia, (materia) => materia.selecciones)
  materia: Materia;

  @Column({ type: "int" })
  dia: string;

  @Column({  type: "int" })
  hora: number;
}
