import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

import {S3Module} from "../s3/s3.module";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [ S3Module, PrismaModule],
  exports: [StudentsService]
})
export class StudentsModule {}
