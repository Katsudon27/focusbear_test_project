import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from "typeorm-encrypted";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  secretEmail: string;
}