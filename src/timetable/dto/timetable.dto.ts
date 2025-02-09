import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class CreateTimetableDto {
    @ApiProperty({
        example: '2025-02-09T00:00:00Z',
        description: 'Дата проведения занятия (в формате ISO)',
    })
    @IsDateString()
    subjDate: Date;
}

export class UpdateTimetableDto {
    @ApiProperty({
        example: '2025-03-01T00:00:00Z',
        description: 'Новая дата проведения занятия (в формате ISO)',
        required: false,
    })
    @IsDateString()
    subjDate?: Date;
}
