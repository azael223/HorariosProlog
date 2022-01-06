import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Turno } from "./Turno";

@Entity({ name: "grupos", synchronize: false })
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;

  // @ManyToOne(() => Turno, (turno) => turno.grupos)
  // turno: Turno;

  @Column()
  turno: number;
}
