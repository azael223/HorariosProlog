import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "maestros", synchronize: false })
export class Maestro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45 })
  nombre: string;
}
