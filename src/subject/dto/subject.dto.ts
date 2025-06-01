import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateSubjectDto {
    @ApiProperty({ example: 'Mathematics', description: 'Название предмета' })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не должно быть пустым' })
    @Length(2, 100, { message: 'Название должно содержать от 2 до 100 символов' })
    name: string;

    @ApiProperty({ example: 'Основной', description: 'Тип предмета' })
    @IsString({ message: 'Тип должен быть строкой' })
    @IsNotEmpty({ message: 'Тип не должен быть пустым' })
    type: string;
}

export class UpdateSubjectDto {
    @ApiProperty({ example: 'Physics', description: 'Название предмета', required: false })
    @IsString({ message: 'Название должно быть строкой' })
    @IsNotEmpty({ message: 'Название не должно быть пустым' })
    @Length(2, 100, { message: 'Название должно содержать от 2 до 100 символов' })
    name?: string;

    @ApiProperty({ example: 'Elective', description: 'Тип предмета', required: false })
    @IsString({ message: 'Тип должен быть строкой' })
    @IsNotEmpty({ message: 'Тип не должен быть пустым' })
    type?: string;
}
export class CreateMarkDto {
    @ApiProperty({ example: 'Оценка', description: 'Оценка за предмет' })
    value: number;
    subjectId: number;
    @ApiProperty({ example: 'ID студента', description: 'Идентификатор студента' })
    studentId: number;
}

export class UpdateMarkDto {
    value?: number;
}