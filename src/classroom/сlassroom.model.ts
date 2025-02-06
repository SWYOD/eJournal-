import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'classroom',
})
export class Classroom extends Model<Classroom> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
  })
  number: number;

  @Column({
    type: DataType.INTEGER,
  })
  capacity: number;
}
