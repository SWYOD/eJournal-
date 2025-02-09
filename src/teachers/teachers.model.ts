import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Timetable} from "../timetable/timetable.model";

@Table({
  tableName: 'teachers',
})

export class Teacher extends Model<Teacher> {
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
  subjects: string;
  @HasMany(() => Timetable)
  timetables: Timetable[];
}
