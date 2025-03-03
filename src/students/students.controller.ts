import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/create-student.dto';
import { Student } from './students.model';
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";

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
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Загрузка аватара студента' })
  @ApiParam({ name: 'id', description: 'ID студента', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Файл аватара',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Аватар успешно загружен',
    type: Student,
  })
  @ApiResponse({ status: 400, description: 'Некорректный файл' })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  async uploadAvatar(
      @Param('id') id: number,
      @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentService.uploadAvatar(id, file);
  }

  @Post(':id/cover')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Загрузка обложки студента' })
  @ApiParam({ name: 'id', description: 'ID студента', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Файл обложки',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Обложка успешно загружена',
    type: Student,
  })
  @ApiResponse({ status: 400, description: 'Некорректный файл' })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  async uploadCover(
      @Param('id') id: number,
      @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentService.uploadCover(id, file);
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
