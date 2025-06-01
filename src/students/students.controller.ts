import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors, Query
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/create-student.dto';
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Students')
@Controller('students')
@ApiBearerAuth()
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @ApiOperation({ summary: 'Создание студента' })
  @ApiResponse({ status: 201, description: 'Студент успешно создан' })
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }
  @Get(':id/marks')
  getStudentMarks(
      @Param('id') id: string,
      @Query('subjectId') subjectId?: string
  ) {
    return this.studentService.getAllStudentMarks(
        Number(id),
        subjectId ? Number(subjectId) : undefined
    );
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
  @ApiResponse({ status: 200, description: 'Возвращает список студентов' })
  // @UseGuards(AuthGuard('student'))
  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({ summary: 'Получение студента по ID' })
  @ApiResponse({ status: 200, description: 'Студент найден' })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  // @UseGuards(AuthGuard('student'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.studentService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление студента' })
  @ApiResponse({ status: 200, description: 'Студент обновлён' })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  // @UseGuards(AuthGuard('student'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Удаление студента' })
  @ApiResponse({ status: 200, description: 'Студент удалён' })
  @ApiResponse({ status: 404, description: 'Студент не найден' })
  // @UseGuards(AuthGuard('student'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.studentService.remove(id);
  }
}
