import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService],
  imports: [PrismaModule],
})
export class ClassroomModule {}
