import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
}
