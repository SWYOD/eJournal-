import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Teachers')
@Controller('teachers')
@ApiBearerAuth()
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @ApiOperation({ summary: 'Создание учителя' })
  @ApiResponse({ status: 201, description: 'Учитель успешно создан' })
  @UseGuards(AuthGuard('student'))
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({ summary: 'Получение всех учителей' })
  @ApiResponse({ status: 200, description: 'Возвращает список учителей' })
  @UseGuards(AuthGuard('student'))
  @Get()
  async findAll() {
    return this.teacherService.findAll();
  }

  @ApiOperation({ summary: 'Получение учителя по ID' })
  @ApiResponse({ status: 200, description: 'Учитель найден' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  @UseGuards(AuthGuard('student'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель обновлен' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  @UseGuards(AuthGuard('student'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({ summary: 'Удаление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель удален' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  @UseGuards(AuthGuard('student'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.teacherService.remove(id);
  }
}
