import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsInt, IsDateString } from 'class-validator';
import {PartialType} from "@nestjs/mapped-types";

export class CreateStudentDto {
  @ApiProperty({ example: 'staskoroboff', description: 'Никнейм студента' })
  @IsString({ message: 'Имя должно быть строкой' })
  // @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  name: string;

  @ApiProperty({ example: 'Станислав', description: 'Имя студента' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  first_name: string;

  @ApiProperty({ example: 'Коробов', description: 'Фамилия студента' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  second_name: string;

  @ApiProperty({ example: '2000-01-01', description: 'Дата рождения студента (формат ISO: YYYY-MM-DD)' })
  @IsDateString()
  bDate: Date;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email студента' })
  @IsNotEmpty({ message: 'Email не должно быть пустым' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 1, description: 'ID группы, к которой принадлежит студент' })
  groupId: number;

  @ApiProperty({ example: '1a3d5g7j9l', description: 'Пароль студента' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль не должен быть пустым' })
  password: string
}

export class UpdateStudentDto extends PartialType(CreateStudentDto){}
