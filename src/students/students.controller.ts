import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/create-student.dto';
import { Student } from './students.model';
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @ApiOperation({ summary: 'Создание студента' })
  @ApiResponse({ status: 201, description: 'Студент успешно создан', type: Student })
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({ summary: 'Получение всех студентов' })
  @ApiResponse({ status: 200, description: 'Возвращает список студентов', type: [Student] })
  // @UseGuards(AuthGuard('student'))
  @Get()
  async findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'Получение студента по ID' })
  @ApiResponse({ status: 200, description: 'Студент найден', type: Student })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  // @UseGuards(AuthGuard('student'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление студента' })
  @ApiResponse({ status: 200, description: 'Студент обновлён', type: Student })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  // @UseGuards(AuthGuard('student'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Удаление студента' })
  @ApiResponse({ status: 200, description: 'Студент удалён' })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  // @UseGuards(AuthGuard('student'))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.studentService.remove(id);
  }
}
