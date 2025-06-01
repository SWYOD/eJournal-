import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/classroom.dto';

@ApiTags('Classrooms')
@ApiBearerAuth()
@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @ApiOperation({ summary: 'Создание аудитории' })
  @ApiResponse({ status: 201, description: 'Аудитория успешно создана' })
  @Post()
  async create(@Body() createClassroomDto: CreateClassroomDto){
    return this.classroomService.create(createClassroomDto);
  }

  @ApiOperation({ summary: 'Получение всех аудиторий' })
  @ApiResponse({ status: 200, description: 'Возвращает список аудиторий' })
  @Get()
  async findAll() {
    return this.classroomService.findAll();
  }

  @ApiOperation({ summary: 'Получение аудитории по ID' })
  @ApiResponse({ status: 200, description: 'Аудитория найдена' })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.classroomService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление аудитории' })
  @ApiResponse({ status: 200, description: 'Аудитория обновлена'})
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateClassroomDto: UpdateClassroomDto) {
    return this.classroomService.update(id, updateClassroomDto);
  }

  @ApiOperation({ summary: 'Удаление аудитории' })
  @ApiResponse({ status: 200, description: 'Аудитория удалена' })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.classroomService.remove(id);
  }
}
