import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum Period {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export class MarksFilterDto {
  @IsOptional()
  @IsEnum(Period)
  period?: Period;

  @IsOptional()
  @IsString()
  groupId?: string;

  @IsOptional()
  @IsString()
  startDate?: string; // Для навигации по периодам
}

export class AverageMarkResponse {
  period: string;
  average: number;
}

export class MonthWeekData {
  weekNumber: number;
  days: {
    dayOfWeek: string;
    average: number;
  }[];
}
