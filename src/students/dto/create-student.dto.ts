import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsInt, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe', description: 'Имя студента' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  name: string;

  @ApiProperty({ example: '2000-01-01', description: 'Дата рождения студента (формат ISO: YYYY-MM-DD)' })
  @IsDateString()
  bDate: Date;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email студента' })
  @IsEmail({}, { message: 'Неверный формат email' })
  email: string;

  @ApiProperty({ example: 1, description: 'ID группы, к которой принадлежит студент' })
  @IsInt({ message: 'ID группы должно быть числом' })
  groupId: number;
}

export class UpdateStudentDto {
  @ApiProperty({ example: 'John Doe', description: 'Имя студента', required: false })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  name?: string;

  @ApiProperty({ example: '2000-01-01', description: 'Дата рождения студента (формат ISO: YYYY-MM-DD)', required: false })
  @IsDateString()
  bDate?: Date;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email студента', required: false })
  @IsEmail({}, { message: 'Неверный формат email' })
  email?: string;

  @ApiProperty({ example: 1, description: 'ID группы, к которой принадлежит студент', required: false })
  @IsInt({ message: 'ID группы должно быть числом' })
  groupId?: number;
}
