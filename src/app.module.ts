import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimetableModule } from './timetable/timetable.module';
import { SubjectModule } from './subject/subject.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { GroupsModule } from './groups/groups.module';
import { ClassroomModule } from './classroom/classroom.module';
import { Student } from './students/students.model';
import { Group } from './groups/groups.model';
import {Timetable} from "./timetable/timetable.model";

import {Teacher} from "./teachers/teachers.model";
import {Subject} from "./subject/subject.model";
import {Classroom} from "./classroom/сlassroom.model";

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '176.124.210.247',
      port: 5432,
      username: 'ejournal',
      password: 'D%ia_.yY6Ze\\!#',
      database: 'ejournal',
      models: [Student, Group,Timetable,Subject,Teacher, Classroom],
      autoLoadModels: true,
    }),
    StudentsModule,
    TeachersModule,
    TimetableModule,
    ClassroomModule,
    GroupsModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
