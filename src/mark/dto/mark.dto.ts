import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
  IsNumber,
  IsDateString,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class CreateMarkDto {
  @ApiProperty({ description: 'ID студента', example: 1 })
  @IsInt()
  @IsNotEmpty()
  studentId: number;

  @ApiProperty({ description: 'ID предмета', example: 1 })
  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ description: 'Оценка (1-5)', example: 4 })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  value: number;
}

export class UpdateMarkDto {
  @ApiPropertyOptional({ description: 'Новая оценка (1-5)', example: 5 })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(5)
  value?: number;
}

export class MarkResponseDto {
  @ApiProperty({ description: 'ID оценки', example: 1 })
  id: number;

  @ApiProperty({ description: 'Значение оценки', example: 4 })
  value: number;

  @ApiProperty({ description: 'ID предмета', example: 1 })
  subjectId: number;

  @ApiProperty({ description: 'ID студента', example: 1 })
  studentId: number;

  @ApiProperty({
    description: 'Дата создания',
    example: '2023-05-20T10:30:00Z',
  })
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Дата обновления',
    example: '2023-05-21T11:45:00Z',
  })
  updatedAt?: Date;
}

export class MarksByStudentResponseDto {
  @ApiProperty({ description: 'ID студента', example: 1 })
  studentId: number;

  @ApiProperty({
    description: 'Оценки сгруппированные по предметам',
    example: {
      1: [
        {
          id: 1,
          value: 4,
          subjectId: 1,
          studentId: 1,
          createdAt: '2023-05-20T10:30:00Z',
          updatedAt: '2023-05-21T11:45:00Z',
        },
      ],
    },
  })
  marks: {
    [subjectId: number]: MarkResponseDto[];
  };
}

export class MarksByGroupResponseDto {
  @ApiProperty({ description: 'ID группы', example: 1 })
  groupId: number;

  @ApiProperty({
    description: 'Оценки сгруппированные по предметам',
    example: {
      1: [
        {
          id: 1,
          value: 4,
          subjectId: 1,
          studentId: 1,
          createdAt: '2023-05-20T10:30:00Z',
          updatedAt: '2023-05-21T11:45:00Z',
        },
      ],
    },
  })
  marks: {
    [subjectId: number]: MarkResponseDto[];
  };
}

export class MarksByPeriodDto {
  @ApiProperty({
    description: 'Начальная дата периода (включая время)',
    example: '2023-05-01T00:00:00Z',
  })
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Конечная дата периода (включая время)',
    example: '2023-05-31T23:59:59Z',
  })
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({
    description: 'Фильтр по ID групп',
    example: [1, 2],
    type: [Number],
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  groupIds?: number | number[]; // Разрешаем оба типа

  @ApiPropertyOptional({
    description: 'Фильтр по ID предметов',
    example: [1, 3],
    type: [Number],
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  subjectIds?: number | number[];
}
