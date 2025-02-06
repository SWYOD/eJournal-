import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Classroom } from './сlassroom.model';

@Module({
  controllers: [ClassroomController],
  providers: [ClassroomService],
  imports: [SequelizeModule.forFeature([Classroom])],
})
export class ClassroomModule {}
