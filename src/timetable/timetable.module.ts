import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timetable } from './timetable.model';

@Module({
  controllers: [TimetableController],
  providers: [TimetableService],
  imports: [SequelizeModule.forFeature([Timetable])],
})
export class TimetableModule {}
