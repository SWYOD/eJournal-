import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/classroom.dto';
import { Classroom } from './сlassroom.model';

@ApiTags('Classrooms')
@Controller('classrooms')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @ApiOperation({ summary: 'Создание аудитории' })
  @ApiResponse({ status: 201, description: 'Аудитория успешно создана', type: Classroom })
  @Post()
  async create(@Body() createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    return this.classroomService.create(createClassroomDto);
  }

  @ApiOperation({ summary: 'Получение всех аудиторий' })
  @ApiResponse({ status: 200, description: 'Возвращает список аудиторий', type: [Classroom] })
  @Get()
  async findAll(): Promise<Classroom[]> {
    return this.classroomService.findAll();
  }

  @ApiOperation({ summary: 'Получение аудитории по ID' })
  @ApiResponse({ status: 200, description: 'Аудитория найдена', type: Classroom })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Classroom> {
    return this.classroomService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление аудитории' })
  @ApiResponse({ status: 200, description: 'Аудитория обновлена', type: Classroom })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateClassroomDto: UpdateClassroomDto): Promise<Classroom> {
    return this.classroomService.update(id, updateClassroomDto);
  }

  @ApiOperation({ summary: 'Удаление аудитории' })
  @ApiResponse({ status: 200, description: 'Аудитория удалена' })
  @ApiResponse({ status: 404, description: 'Аудитория не найдена' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.classroomService.remove(id);
  }
}
