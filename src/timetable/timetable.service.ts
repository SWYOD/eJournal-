import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTimetableDto,
  GetWeeklyTimetableDto,
  UpdateTimetableDto
} from './dto/timetable.dto';
import { startOfWeek, endOfWeek } from 'date-fns';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TimetableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTimetableDto: CreateTimetableDto) {
    return this.prisma.timetable.create({
      data: createTimetableDto,
      include: {
        teacher: true,
        classroom: true,
        group: true,
        subject: true
      }
    });
  }

  async findAll() {
    return this.prisma.timetable.findMany({
      include: {
        teacher: true,
        classroom: true,
        group: true,
        subject: true
      }
    });
  }

  async findOne(id: number) {
    const timetable = await this.prisma.timetable.findUnique({
      where: { id },
      include: {
        teacher: true,
        classroom: true,
        group: true,
        subject: true
      }
    });

    if (!timetable) {
      throw new NotFoundException(`Запись расписания с ID ${id} не найдена`);
    }
    return timetable;
  }

  async findWeekly(getWeeklyDto: GetWeeklyTimetableDto) {
    const { groupId, weekStart } = getWeeklyDto;

    // Рассчитываем границы недели
    const startDate = startOfWeek(new Date(weekStart), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(weekStart), { weekStartsOn: 1 });

    return this.prisma.timetable.findMany({
      where: {
        groupId: groupId,
        subjDate: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        teacher: true,
        classroom: true,
        group: true,
        subject: true
      },
      orderBy: {
        subjDate: 'asc'
      }
    });
  }

  async update(id: number, updateTimetableDto: UpdateTimetableDto) {
    // Проверяем существование записи
    await this.findOne(id);

    return this.prisma.timetable.update({
      where: { id },
      data: updateTimetableDto,
      include: {
        teacher: true,
        classroom: true,
        group: true,
        subject: true
      }
    });
  }

  async remove(id: number) {
    // Проверяем существование записи
    await this.findOne(id);

    return this.prisma.timetable.delete({
      where: { id }
    });
  }
}