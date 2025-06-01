import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import {PrismaModule} from "../prisma/prisma.module";


@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
  imports: [PrismaModule],
})
export class SubjectModule {}
