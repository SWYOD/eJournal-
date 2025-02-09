import {Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import {Timetable} from "../timetable/timetable.model";

@Table({
  tableName: 'subject',
})
export class Subject extends Model<Subject> {
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
  type: string;
  @HasMany(() => Timetable)
  timetables: Timetable[];
}
