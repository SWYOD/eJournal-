import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'timetable',
})
export class Timetable extends Model<Timetable> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
}
