import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto, UpdateTimetableDto } from './dto/timetable.dto';
import { Timetable } from './timetable.model';

@ApiTags('Timetables')
@Controller('timetables')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @ApiOperation({ summary: 'Создание записи расписания' })
  @ApiResponse({ status: 201, description: 'Запись успешно создана', type: Timetable })
  @Post()
  async create(@Body() createTimetableDto: CreateTimetableDto): Promise<Timetable> {
    return this.timetableService.create(createTimetableDto);
  }

  @ApiOperation({ summary: 'Получение всех записей расписания' })
  @ApiResponse({ status: 200, description: 'Список записей расписания', type: [Timetable] })
  @Get()
  async findAll(): Promise<Timetable[]> {
    return this.timetableService.findAll();
  }

  @ApiOperation({ summary: 'Получение записи расписания по ID' })
  @ApiResponse({ status: 200, description: 'Запись расписания найдена', type: Timetable })
  @ApiResponse({ status: 404, description: 'Запись расписания не найдена' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Timetable> {
    return this.timetableService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление записи расписания' })
  @ApiResponse({ status: 200, description: 'Запись расписания обновлена', type: Timetable })
  @ApiResponse({ status: 404, description: 'Запись расписания не найдена' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTimetableDto: UpdateTimetableDto): Promise<Timetable> {
    return this.timetableService.update(id, updateTimetableDto);
  }

  @ApiOperation({ summary: 'Удаление записи расписания' })
  @ApiResponse({ status: 200, description: 'Запись расписания удалена' })
  @ApiResponse({ status: 404, description: 'Запись расписания не найдена' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.timetableService.remove(id);
  }
}
