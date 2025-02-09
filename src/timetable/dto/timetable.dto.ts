import { ApiProperty } from '@nestjs/swagger';
import {IsDateString, IsInt} from 'class-validator';
import {Column, DataType, ForeignKey} from "sequelize-typescript";
import {Teacher} from "../../teachers/teachers.model";
import {Classroom} from "../../classroom/сlassroom.model";
import {Group} from "../../groups/groups.model";
import {Subject} from "../../subject/subject.model";
import {PartialType} from "@nestjs/mapped-types";

export class CreateTimetableDto {
    @ApiProperty({
        example: '2025-02-09T00:00:00Z',
        description: 'Дата проведения занятия (в формате ISO)',
    })
    @IsDateString()
    subjDate: Date;
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

export class UpdateTimetableDto extends PartialType(CreateTimetableDto){

}
