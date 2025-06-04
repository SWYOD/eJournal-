import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateMarkDto {
  @ApiProperty({ example: 5, description: 'Значение оценки' })
  @IsInt()
  @Min(1)
  @Max(5)
  value: number;

  @ApiProperty({ example: 1, description: 'ID студента' })
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ example: 1, description: 'ID предмета' })
  @IsNotEmpty()
  subjectId: number;
}

export class UpdateMarkDto {
  @ApiProperty({
    example: 4,
    description: 'Новое значение оценки',
    required: false,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  value?: number;
}

export class PeriodFilterDto {
  @ApiProperty({
    example: 'week',
    description: 'Период фильтрации (day, week, month, year)',
    enum: ['day', 'week', 'month', 'year'],
  })
  @IsNotEmpty()
  period: 'day' | 'week' | 'month' | 'year';
}

export class GroupMarksResponseDto {
  @ApiProperty({ example: '1', description: 'Идентификатор периода' })
  period: string;

  @ApiProperty({ example: 4.5, description: 'Средняя оценка' })
  average: number;

  @ApiProperty({
    example: 'Понедельник',
    description: 'Название периода',
    required: false,
  })
  periodName?: string;
}
