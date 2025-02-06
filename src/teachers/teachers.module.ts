import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teacher } from './teachers.model';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [SequelizeModule.forFeature([Teacher])],
})
export class TeachersModule {}
