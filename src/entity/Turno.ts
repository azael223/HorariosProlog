import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Grupo } from "./Grupo";

@Entity({ name: "turnos", synchronize: false })
export class Turno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  @Column({ type: "time" })
  hora_inicio: Date;

  @Column({ type: "time" })
  hora_fin: Date;

  // @OneToMany(() => Grupo, (grupo) => grupo.turno)
  // grupos: Grupo[];
}
