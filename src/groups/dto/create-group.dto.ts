import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Length } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Math Group', description: 'Название группы' })
  @IsString({ message: 'Название должно быть строкой' })
  @Length(2, 50, { message: 'Название должно содержать от 2 до 50 символов' })
  name: string;

  @ApiProperty({ example: 25, description: 'Количество студентов в группе' })
  @IsInt({ message: 'Количество студентов должно быть целым числом' })
  @Min(1, { message: 'Минимальное количество студентов - 1' })
  studentCount: number;

  @ApiProperty({ example: 25, description: 'Специализация' })
  @IsString({ message: 'Название должно быть строкой' })
  specialization: string;
}

export class UpdateGroupDto {
  @ApiProperty({
    example: 'Physics Group',
    description: 'Название группы',
    required: false,
  })
  @IsString({ message: 'Название должно быть строкой' })
  @Length(2, 50, { message: 'Название должно содержать от 2 до 50 символов' })
  name?: string;

  @ApiProperty({
    example: 30,
    description: 'Количество студентов в группе',
    required: false,
  })
  @IsInt({ message: 'Количество студентов должно быть целым числом' })
  @Min(1, { message: 'Минимальное количество студентов - 1' })
  studCount?: number;
}
