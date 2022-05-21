import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RepeatType {
  DAYS = 'Days',
  WEEKS = 'Weeks',
  MONTHS = 'Months',
  YEARS = 'Years',
}

@Entity()
// Applicable only for const tasks (Add some validation)
export class Repeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startFrom: Date;

  @Column({ type: 'int' })
  repeatEvery: number;

  @Column({ type: 'enum', enum: RepeatType, default: RepeatType.DAYS })
  repeatType: RepeatType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
