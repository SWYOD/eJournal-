import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  controllers: [TimetableController],
  providers: [TimetableService],
  imports: [PrismaModule],
})
export class TimetableModule {}
