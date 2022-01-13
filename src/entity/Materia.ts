import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Clase } from "./Clase";

@Entity()
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @Column({ type: "int" })
  limiteSemana: number;

  @OneToMany(() => Clase, (clase) => clase.materia)
  clases: Clase[];
}
