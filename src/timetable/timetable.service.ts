import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTimetableDto,
  GetWeeklyTimetableDto,
  UpdateTimetableDto,
} from './dto/timetable.dto';
import { startOfWeek, endOfWeek } from 'date-fns';
import { PrismaService } from '../prisma/prisma.service';

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
        subject: true,
      },
    });
  }

  async findAll({
    page = 1,
    limit = 10,
    teacherId,
    classroomId,
    groupId,
    subjectId,
    sortBy = 'subjDate',
    sortOrder = 'asc',
  }: {
    page?: number;
    limit?: number;
    teacherId?: number;
    classroomId?: number;
    groupId?: number;
    subjectId?: number;
    sortBy?: 'subjDate' | 'endDate';
    sortOrder?: 'asc' | 'desc';
  }) {
    // Убедимся, что используем UTC время для сравнения
    const now = new Date();
    const nowUTC = new Date(now.toISOString());

    const where = {};
    if (teacherId) where['teacherId'] = teacherId;
    if (classroomId) where['classroomId'] = classroomId;
    if (groupId) where['groupId'] = groupId;
    if (subjectId) where['subjectId'] = subjectId;

    const [total, timetables] = await Promise.all([
      this.prisma.timetable.count({ where }),
      this.prisma.timetable.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy: { [sortBy]: sortOrder },
        include: {
          teacher: true,
          classroom: true,
          group: true,
          subject: true,
        },
      }),
    ]);

    // Добавляем статус к каждому элементу расписания
    const data = timetables.map((timetable) => {
      // Конвертируем даты из БД в Date объекты
      const subjDate = new Date(timetable.subjDate);
      const endDate = new Date(timetable.endDate);

      let status: 'current' | 'previous' | 'next';

      if (nowUTC >= subjDate && nowUTC <= endDate) {
        status = 'current';
      } else if (nowUTC > endDate) {
        status = 'previous';
      } else {
        status = 'next';
      }

      return {
        ...timetable,
        status,
      };
    });

    return {
      data,
      total,
      page,
      last_page: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const timetable = await this.prisma.timetable.findUnique({
      where: { id },
      include: {
        teacher: true,
        classroom: true,
        group: true,
        subject: true,
      },
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
          lte: endDate,
        },
      },
      include: {
        teacher: true,
        classroom: true,
        group: true,
        subject: true,
      },
      orderBy: {
        subjDate: 'asc',
      },
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
        subject: true,
      },
    });
  }

  async remove(id: number) {
    // Проверяем существование записи
    await this.findOne(id);

    return this.prisma.timetable.delete({
      where: { id },
    });
  }
}
