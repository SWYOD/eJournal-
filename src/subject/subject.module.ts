import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './subject.model';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
  imports: [SequelizeModule.forFeature([Subject])],
})
export class SubjectModule {}
