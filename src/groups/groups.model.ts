import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Student } from '../students/students.model';
import {Timetable} from "../timetable/timetable.model";

@Table({
  tableName: 'groups',
})
export class Group extends Model<Group> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;
  @Column({
    type: DataType.STRING,
  })
  specialization : string;
  @Column({
    type: DataType.INTEGER,
  })
  studentCount: number;

  @HasMany(() => Student)
  students: Student[];
  @HasMany(() => Timetable)
  timetables: Timetable[];
}
