import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { TimetableModule } from './timetable/timetable.module';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '176.124.210.247',
      port: 5432,
      username: 'ejournal',
      password: 'D%ia_.yY6Ze\\!#',
      database: 'ejournal',
      models: [],
    }),
    StudentsModule,
    TeachersModule,
    TimetableModule,
    ClassroomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
