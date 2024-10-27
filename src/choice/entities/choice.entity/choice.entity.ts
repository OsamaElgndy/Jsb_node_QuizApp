import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Choice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  optionText: string;

  @Column()
  isCorrect: boolean;
}
