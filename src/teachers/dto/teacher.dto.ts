import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';

@ApiExtraModels()
export class AssignSubjectsDto {
  @ApiProperty({
    example: [1, 2],
    description: 'Массив идентификаторов предметов',
    type: [Number],
  })
  @IsArray({ message: 'Должен быть массив чисел' })
  @IsNumber({}, { each: true, message: 'Каждый элемент должен быть числом' })
  subjectIds: number[];
}

export class CreateTeacherDto {
  @ApiProperty({ example: 'John Doe', description: 'Имя учителя' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  name: string;

  @ApiProperty({
    example: [1, 3],
    description: 'Идентификаторы предметов',
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Предметы должны быть массивом чисел' })
  @IsNumber(
    {},
    { each: true, message: 'Каждый ID предмета должен быть числом' },
  )
  subjectIds?: number[];

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
  password: string;

  @ApiProperty({
    example: 'exemple@exem.com',
    description: 'Электронная почта',
  })
  @IsString({ message: 'Почта должна быть строкой' })
  email: string;
}

export class UpdateTeacherDto {
  @ApiProperty({
    example: 'Jane Doe',
    description: 'Имя учителя',
    required: false,
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: [2, 4],
    description: 'Идентификаторы предметов',
    type: [Number],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Предметы должны быть массивом чисел' })
  @IsNumber(
    {},
    { each: true, message: 'Каждый ID предмета должен быть числом' },
  )
  subjectIds?: number[];
}
