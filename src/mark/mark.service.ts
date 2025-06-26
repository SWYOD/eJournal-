import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarkDto, UpdateMarkDto, MarksByPeriodDto } from './dto/mark.dto';

@Injectable()
export class MarkService {
  constructor(private prisma: PrismaService) {}

  async createMark(dto: CreateMarkDto) {
    return this.prisma.mark.create({
      data: {
        value: dto.value,
        subjectId: dto.subjectId,
        studentId: dto.studentId,
        createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
      },
      include: {
        subject: true,
        student: true,
      },
    });
  }

  async updateMark(id: number, dto: UpdateMarkDto) {
    return this.prisma.mark.update({
      where: { id },
      data: {
        value: dto.value,
        updatedAt: new Date(),
      },
      include: {
        subject: true,
        student: true,
      },
    });
  }

  async deleteMark(id: number) {
    return this.prisma.mark.delete({
      where: { id },
    });
  }

  async getMarksByStudent(studentId: number) {
    const marks = await this.prisma.mark.findMany({
      where: { studentId },
      include: {
        subject: true,
      },
    });

    const result: { [subjectId: number]: any[] } = {};
    marks.forEach((mark) => {
      if (!result[mark.subjectId]) {
        result[mark.subjectId] = [];
      }
      result[mark.subjectId].push({
        id: mark.id,
        value: mark.value,
        subjectId: mark.subjectId,
        studentId: mark.studentId,
        createdAt: mark.createdAt,
        updatedAt: mark.updatedAt,
        subjectName: mark.subject.name,
      });
    });

    return {
      studentId,
      marks: result,
    };
  }

  async getMarksByGroup(groupId: number) {
    const students = await this.prisma.student.findMany({
      where: { groupId },
      select: { id: true },
    });

    const studentIds = students.map((s) => s.id);
    const marks = await this.prisma.mark.findMany({
      where: { studentId: { in: studentIds } },
      include: {
        subject: true,
        student: true,
      },
    });

    const result: { [subjectId: number]: any[] } = {};
    marks.forEach((mark) => {
      if (!result[mark.subjectId]) {
        result[mark.subjectId] = [];
      }
      result[mark.subjectId].push({
        id: mark.id,
        value: mark.value,
        subjectId: mark.subjectId,
        studentId: mark.studentId,
        studentName: `${mark.student.first_name} ${mark.student.second_name}`,
        createdAt: mark.createdAt,
        updatedAt: mark.updatedAt,
        subjectName: mark.subject.name,
      });
    });

    return {
      groupId,
      marks: result,
    };
  }

  async getMarksByPeriod(dto: MarksByPeriodDto) {
    try {
      // Нормализация параметров в массивы чисел
      const normalizeIds = (ids: number | number[] | undefined): number[] => {
        if (!ids) return [];
        if (Array.isArray(ids)) return ids.map(id => Number(id));
        return [Number(ids)];
      };

      const groupIds = normalizeIds(dto.groupIds);
      const subjectIds = normalizeIds(dto.subjectIds);

      // Обработка дат
      const startDate = new Date(dto.startDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(dto.endDate);
      endDate.setHours(23, 59, 59, 999);

      const where: any = {
        createdAt: { gte: startDate, lte: endDate }
      };

      if (groupIds.length > 0) {
        const students = await this.prisma.student.findMany({
          where: { groupId: { in: groupIds } },
          select: { id: true },
        });
        where.studentId = { in: students.map(s => s.id) };
      }

      if (subjectIds.length > 0) {
        where.subjectId = { in: subjectIds };
      }

      return this.prisma.mark.findMany({
        where,
        include: {
          subject: true,
          student: { include: { group: true } },
        },
        orderBy: { createdAt: 'asc' },
      });
    } catch (error) {
      console.error('Detailed error:', error);
      throw new InternalServerErrorException('Failed to fetch marks');
    }
  }
}
