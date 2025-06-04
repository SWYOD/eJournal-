import { Module } from '@nestjs/common';
import { TimetableModule } from './timetable/timetable.module';
import { SubjectModule } from './subject/subject.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { GroupsModule } from './groups/groups.module';
import { ClassroomModule } from './classroom/classroom.module';

import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { PrismaModule } from './prisma/prisma.module';
import { MarkModule } from './mark/mark.module';

@Module({
  imports: [
    StudentsModule,
    TeachersModule,
    TimetableModule,
    ClassroomModule,
    GroupsModule,
    SubjectModule,
    AuthModule,
    S3Module,
    PrismaModule,
    MarkModule,
  ],
})
export class AppModule {}
