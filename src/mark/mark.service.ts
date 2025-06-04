import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarkDto, UpdateMarkDto } from './dto/mark.dto';

@Injectable()
export class MarkService {
  constructor(private prisma: PrismaService) {}

  async create(createMarkDto: CreateMarkDto) {
    // Проверка существования студента и предмета
    const [student, subject] = await Promise.all([
      this.prisma.student.findUnique({
        where: { id: createMarkDto.studentId },
      }),
      this.prisma.subject.findUnique({
        where: { id: createMarkDto.subjectId },
      }),
    ]);

    if (!student) {
      throw new NotFoundException(
        `Студент с ID ${createMarkDto.studentId} не найден`,
      );
    }
    if (!subject) {
      throw new NotFoundException(
        `Предмет с ID ${createMarkDto.subjectId} не найден`,
      );
    }

    return this.prisma.mark.create({
      data: createMarkDto,
    });
  }

  async getGroupAverageMarks(
    groupId: number,
    period: 'day' | 'week' | 'month' | 'year',
  ) {
    // Проверка существования группы
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    });
    if (!group) {
      throw new NotFoundException(`Группа с ID ${groupId} не найдена`);
    }

    const now = new Date();
    let startDate: Date;
    let groupByFormat: string;

    switch (period) {
      case 'day':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        groupByFormat = 'hour';
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
        groupByFormat = 'day';
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupByFormat = 'week';
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        groupByFormat = 'month';
        break;
      default:
        throw new BadRequestException('Недопустимый период');
    }

    const marks = await this.prisma.mark.findMany({
      where: {
        createdAt: { gte: startDate },
        student: { groupId },
      },
      select: {
        value: true,
        createdAt: true,
      },
    });

    const grouped = marks.reduce(
      (acc, mark) => {
        const date = new Date(mark.createdAt);
        let key: string;

        switch (groupByFormat) {
          case 'hour':
            key = date.getHours().toString();
            break;
          case 'day':
            key = date.getDay().toString();
            break;
          case 'week':
            key = (Math.floor((date.getDate() - 1) / 7) + 1).toString();
            break;
          case 'month':
            key = date.getMonth().toString();
            break;
          default:
            key = '0';
        }

        if (!acc[key]) {
          acc[key] = { sum: 0, count: 0 };
        }
        acc[key].sum += mark.value;
        acc[key].count++;
        return acc;
      },
      {} as Record<string, { sum: number; count: number }>,
    );

    return Object.entries(grouped).map(([period, data]) => ({
      period,
      average: parseFloat((data.sum / data.count).toFixed(2)),
      periodName: this.getPeriodName(
        period,
        period as 'day' | 'week' | 'month' | 'year',
      ),
    }));
  }

  private getPeriodName(
    period: string,
    type: 'day' | 'week' | 'month' | 'year',
  ): string {
    const days = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ];
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    switch (type) {
      case 'day':
        return `${period}:00`;
      case 'week':
        return days[parseInt(period)] || period;
      case 'month':
        return `${period} неделя`;
      case 'year':
        return months[parseInt(period)] || period;
      default:
        return period;
    }
  }

  async update(id: number, updateMarkDto: UpdateMarkDto) {
    const mark = await this.prisma.mark.findUnique({ where: { id } });
    if (!mark) {
      throw new NotFoundException(`Оценка с ID ${id} не найдена`);
    }

    return this.prisma.mark.update({
      where: { id },
      data: updateMarkDto,
    });
  }

  async remove(id: number) {
    const mark = await this.prisma.mark.findUnique({ where: { id } });
    if (!mark) {
      throw new NotFoundException(`Оценка с ID ${id} не найдена`);
    }

    return this.prisma.mark.delete({ where: { id } });
  }
}
