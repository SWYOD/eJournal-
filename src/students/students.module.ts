import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './students.model';
import {S3Module} from "../s3/s3.module";

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [SequelizeModule.forFeature([Student]), S3Module],
  exports: [StudentsService]
})
export class StudentsModule {}
