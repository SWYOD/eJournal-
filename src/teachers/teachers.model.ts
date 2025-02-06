import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
