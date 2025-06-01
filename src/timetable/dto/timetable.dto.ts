import { ApiProperty } from '@nestjs/swagger';
import {IsDateString, IsInt} from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateTimetableDto {
    @ApiProperty({
        example: '2025-02-09T00:00:00Z',
        description: 'Дата проведения занятия (в формате ISO)',
    })
    @IsDateString()
    subjDate: Date;
    @ApiProperty({
        example: '2025-02-09T00:00:00Z',
        description: 'Дата окончания занятия (в формате ISO)',
    })
    @IsDateString()
    endDate: Date;
    @ApiProperty({ example: 1, description: 'ID учителя' })
    @IsInt({ message: 'ID учителя должно быть числом' })
    teacherId: number;
    @ApiProperty({ example: 1, description: 'ID кабинеты' })
    @IsInt({ message: 'ID кабинеты должно быть числом' })
    classroomId: number;
    @ApiProperty({ example: 1, description: 'ID группы' })
    @IsInt({ message: 'ID группы должно быть числом' })
    groupId: number;
    @ApiProperty({ example: 1, description: 'ID предмета' })
    @IsInt({ message: 'ID предмета должно быть числом' })
    subjectId: number;
}
export class GetWeeklyTimetableDto {
    groupId: number;
    weekStart: Date; // Дата начала недели в формате ISO (YYYY-MM-DD)
}
export class UpdateTimetableDto extends PartialType(CreateTimetableDto){

}
