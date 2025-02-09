import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTeacherDto {
    @ApiProperty({ example: 'John Doe', description: 'Имя учителя' })
    @IsString({ message: 'Имя должно быть строкой' })
    @IsNotEmpty({ message: 'Имя не должно быть пустым' })
    name: string;

    @ApiProperty({ example: 'Mathematics, Physics', description: 'Преподаваемые предметы' })
    @IsString({ message: 'Предметы должны быть строкой' })
    @IsNotEmpty({ message: 'Предметы не должны быть пустыми' })
    subjects: string;
}

export class UpdateTeacherDto {
    @ApiProperty({ example: 'Jane Doe', description: 'Имя учителя', required: false })
    @IsString({ message: 'Имя должно быть строкой' })
    name?: string;

    @ApiProperty({ example: 'Chemistry, Biology', description: 'Преподаваемые предметы', required: false })
    @IsString({ message: 'Предметы должны быть строкой' })
    subjects?: string;
}
