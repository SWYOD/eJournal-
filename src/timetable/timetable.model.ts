import { Column, DataType, ForeignKey, BelongsTo, Model, Table } from 'sequelize-typescript';
import { Teacher } from '../teachers/teachers.model';
import { Classroom } from '../classroom/сlassroom.model'; // Проверьте, что путь и имя файла указаны корректно
import { Group } from '../groups/groups.model';
import {Subject} from "../subject/subject.model";

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

  @Column({
    type: DataType.DATE,
  })
  subjDate: Date;
  @Column({
    type: DataType.STRING,
  })
  description: string;
  @Column({
    type: DataType.STRING,
  })
  homework: string;
  // Внешние ключи
  @ForeignKey(() => Teacher)
  @Column({
    type: DataType.INTEGER,
  })
  teacherId: number;

  @ForeignKey(() => Classroom)
  @Column({
    type: DataType.INTEGER,
  })
  classroomId: number;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
  })
  groupId: number;
  @ForeignKey(() => Subject)
  @Column({
    type: DataType.INTEGER,
  })
  subjectId: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;

  @BelongsTo(() => Classroom)
  classroom: Classroom;

  @BelongsTo(() => Group)
  group: Group;
  @BelongsTo(() => Subject)
  subject: Subject;
}
