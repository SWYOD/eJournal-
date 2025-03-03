import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from '../groups/groups.model';

@Table({
  tableName: 'students',
})
export class Student extends Model<Student> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
  @Column({
    type: DataType.STRING,
  })
  first_name: string;
  @Column({
    type: DataType.STRING,
  })
  second_name: string;

  @Column({
    type: DataType.DATE,
  })
  bDate: Date;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
  })
  groupId: number;
  @BelongsTo(() => Group)
  group: Group;
}
