import { Module } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarkController } from './mark.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Добавьте эту строку
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
