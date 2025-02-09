import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import { Teacher } from './teachers.model';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @ApiOperation({ summary: 'Создание учителя' })
  @ApiResponse({ status: 201, description: 'Учитель успешно создан', type: Teacher })
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({ summary: 'Получение всех учителей' })
  @ApiResponse({ status: 200, description: 'Возвращает список учителей', type: [Teacher] })
  @Get()
  async findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll();
  }

  @ApiOperation({ summary: 'Получение учителя по ID' })
  @ApiResponse({ status: 200, description: 'Учитель найден', type: Teacher })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Teacher> {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель обновлен', type: Teacher })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({ summary: 'Удаление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель удален' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.teacherService.remove(id);
  }
}
