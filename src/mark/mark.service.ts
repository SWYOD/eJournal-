import { Injectable } from '@nestjs/common';
import { Period, MarksFilterDto } from './dto/mark.dto';
import * as dateFns from 'date-fns';
import { ru } from 'date-fns/locale';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarkService {
  constructor(private prisma: PrismaService) {}

  private getDateRange(
    period: Period,
    baseDate: Date = new Date(),
  ): { start: Date; end: Date } {
    switch (period) {
      case Period.DAY:
        return {
          start: dateFns.startOfDay(baseDate),
          end: dateFns.endOfDay(baseDate),
        };
      case Period.WEEK:
        return {
          start: dateFns.startOfWeek(baseDate, { locale: ru }),
          end: dateFns.endOfWeek(baseDate, { locale: ru }),
        };
      case Period.MONTH:
        return {
          start: dateFns.startOfMonth(baseDate),
          end: dateFns.endOfMonth(baseDate),
        };
      case Period.YEAR:
        return {
          start: dateFns.startOfYear(baseDate),
          end: dateFns.endOfYear(baseDate),
        };
      default:
        return {
          start: dateFns.subDays(baseDate, 7),
          end: baseDate,
        };
    }
  }

  private getWeekNumber(date: Date): number {
    const startOfMonth = dateFns.startOfMonth(date);
    const diffInDays = dateFns.differenceInCalendarDays(date, startOfMonth);
    return Math.floor(diffInDays / 7) + 1;
  }

  async getAverageMarks(filter: MarksFilterDto) {
    const { period = Period.WEEK, groupId, startDate } = filter;
    const baseDate = startDate ? new Date(startDate) : new Date();
    const { start, end } = this.getDateRange(period, baseDate);

    // Получаем все оценки за период
    const marks = await this.prisma.mark.findMany({
      where: {
        createdAt: { gte: start, lte: end },
        ...(groupId && { student: { groupId: Number(groupId) } }),
      },
      select: { value: true, createdAt: true },
    });

    // Группировка по периодам
    switch (period) {
      case Period.DAY:
        return this.groupByHour(marks, start);
      case Period.WEEK:
        return this.groupByDayOfWeek(marks);
      case Period.MONTH:
        return this.groupByMonth(marks, start, end);
      case Period.YEAR:
        return this.groupByMonthOfYear(marks);
      default:
        return [];
    }
  }

  // Группировка по часам (8:00-20:00)
  private groupByHour(marks: any[], dayStart: Date) {
    const result: { period: string; average: number }[] = [];
    for (let hour = 8; hour <= 20; hour++) {
      const hourStart = new Date(dayStart);
      hourStart.setHours(hour, 0, 0, 0);
      const hourEnd = new Date(dayStart);
      hourEnd.setHours(hour + 1, 0, 0, 0);

      const hourMarks = marks.filter((mark) => {
        const markDate = new Date(mark.createdAt);
        return markDate >= hourStart && markDate < hourEnd;
      });

      const avg = hourMarks.length
        ? hourMarks.reduce((sum, m) => sum + m.value, 0) / hourMarks.length
        : 0;

      result.push({
        period: `${hour}:00`,
        average: parseFloat(avg.toFixed(2)),
      });
    }
    return result;
  }

  // Группировка по дням недели
  private groupByDayOfWeek(marks: any[]) {
    const days = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ];
    const result = Array(7)
      .fill(0)
      .map(() => ({ count: 0, sum: 0 }));

    marks.forEach((mark) => {
      const dayIndex = new Date(mark.createdAt).getDay();
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Пн=0, Вс=6
      result[adjustedIndex].sum += mark.value;
      result[adjustedIndex].count++;
    });

    return result.map((data, index) => ({
      period: days[index],
      average: data.count ? parseFloat((data.sum / data.count).toFixed(2)) : 0,
    }));
  }

  // Группировка по месяцам года
  private groupByMonthOfYear(marks: any[]) {
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
    const result = Array(12)
      .fill(0)
      .map(() => ({ count: 0, sum: 0 }));

    marks.forEach((mark) => {
      const monthIndex = new Date(mark.createdAt).getMonth();
      result[monthIndex].sum += mark.value;
      result[monthIndex].count++;
    });

    return result.map((data, index) => ({
      period: months[index],
      average: data.count ? parseFloat((data.sum / data.count).toFixed(2)) : 0,
    }));
  }

  // Иерархическая группировка для месяца
  private groupByMonth(marks: any[], monthStart: Date, monthEnd: Date) {
    const weeks: {
      weekNumber: number;
      days: { dayOfWeek: string; average: number }[];
    }[] = [];
    let currentWeekStart = new Date(monthStart);

    // Формируем недели месяца
    while (currentWeekStart <= monthEnd) {
      const weekNumber = this.getWeekNumber(currentWeekStart);
      const weekEnd = dateFns.endOfWeek(currentWeekStart, { locale: ru });

      const days: { dayOfWeek: string; average: number }[] = [];
      for (let i = 0; i < 7; i++) {
        const currentDay = dateFns.addDays(currentWeekStart, i);
        if (currentDay > monthEnd) break;

        const dayMarks = marks.filter((mark) =>
          dateFns.isSameDay(new Date(mark.createdAt), currentDay),
        );

        const avg = dayMarks.length
          ? dayMarks.reduce((sum, m) => sum + m.value, 0) / dayMarks.length
          : 0;

        days.push({
          dayOfWeek: dateFns.format(currentDay, 'EEEE', { locale: ru }),
          average: parseFloat(avg.toFixed(2)),
        });
      }

      weeks.push({
        weekNumber,
        days,
      });

      currentWeekStart = dateFns.addWeeks(currentWeekStart, 1);
    }

    return weeks;
  }
}
