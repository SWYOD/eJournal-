import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateClassroomDto {
    @ApiProperty({
        example: 101,
        description: 'Номер аудитории',
    })
    @IsInt({ message: 'Номер должен быть целым числом' })
    number: number;

    @ApiProperty({
        example: 30,
        description: 'Вместимость аудитории',
    })
    @IsInt({ message: 'Вместимость должна быть целым числом' })
    @Min(1, { message: 'Вместимость должна быть минимум 1' })
    capacity: number;
}

export class UpdateClassroomDto {
    @ApiProperty({
        example: 101,
        description: 'Номер аудитории',
        required: false,
    })
    @IsInt({ message: 'Номер должен быть целым числом' })
    number?: number;

    @ApiProperty({
        example: 30,
        description: 'Вместимость аудитории',
        required: false,
    })
    @IsInt({ message: 'Вместимость должна быть целым числом' })
    @Min(1, { message: 'Вместимость должна быть минимум 1' })
    capacity?: number;
}