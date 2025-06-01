import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimetableService } from './timetable.service';
import {CreateTimetableDto, GetWeeklyTimetableDto, UpdateTimetableDto} from './dto/timetable.dto';


@ApiTags('Timetables')
@Controller('timetables')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @ApiOperation({ summary: 'Создание записи расписания' })
  @ApiResponse({ status: 201, description: 'Запись успешно создана' })
  // @UseGuards(AuthGuard('student'))
  @Post()
  async create(@Body() createTimetableDto: CreateTimetableDto) {
    return this.timetableService.create(createTimetableDto);
  }

  @ApiOperation({ summary: 'Получение всех записей расписания' })
  @ApiResponse({ status: 200, description: 'Список записей расписания' })
  // @UseGuards(AuthGuard('student'))
  @Get()
  async findAll() {
    return this.timetableService.findAll();
  }

  @ApiOperation({ summary: 'Получение записи расписания по ID' })
  @ApiResponse({ status: 200, description: 'Запись расписания найдена' })
  @ApiResponse({ status: 404, description: 'Запись расписания не найдена' })
  // @UseGuards(AuthGuard('student'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.timetableService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление записи расписания' })
  @ApiResponse({ status: 200, description: 'Запись расписания обновлена' })
  @ApiResponse({ status: 404, description: 'Запись расписания не найдена' })
  // @UseGuards(AuthGuard('student'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTimetableDto: UpdateTimetableDto) {
    return this.timetableService.update(id, updateTimetableDto);
  }

  @ApiOperation({ summary: 'Удаление записи расписания' })
  @ApiResponse({ status: 200, description: 'Запись расписания удалена' })
  @ApiResponse({ status: 404, description: 'Запись расписания не найдена' })
  // @UseGuards(AuthGuard('student'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.timetableService.remove(id);
  }
  @Get('weekly')
  async getWeekly(@Query() getWeeklyDto: GetWeeklyTimetableDto) {
    return this.timetableService.findWeekly(getWeeklyDto);
  }
}
