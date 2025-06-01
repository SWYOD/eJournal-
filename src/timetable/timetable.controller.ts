import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import { TimetableService } from './timetable.service';
import {CreateTimetableDto, GetWeeklyTimetableDto, UpdateTimetableDto} from './dto/timetable.dto';


@ApiTags('Timetables')
@Controller('timetables')
@ApiBearerAuth()
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @ApiOperation({ summary: 'Создание записи расписания' })
  @ApiResponse({ status: 201, description: 'Запись успешно создана' })
  // @UseGuards(AuthGuard('student'))
  @Post()
  async create(@Body() createTimetableDto: CreateTimetableDto) {
    return this.timetableService.create(createTimetableDto);
  }

  @ApiOperation({ summary: 'Получение всех записей расписания с пагинацией и фильтрами' })
  @ApiResponse({ status: 200, description: 'Список записей расписания с метаданными пагинации' })

  // Параметры пагинации
  @ApiQuery({ name: 'page', required: false, description: 'Номер страницы (по умолчанию 1)', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Количество элементов на странице (по умолчанию 10)', type: Number })

  // Фильтры
  @ApiQuery({ name: 'teacherId', required: false, description: 'Фильтр по ID преподавателя', type: Number })
  @ApiQuery({ name: 'classroomId', required: false, description: 'Фильтр по ID аудитории', type: Number })
  @ApiQuery({ name: 'groupId', required: false, description: 'Фильтр по ID группы', type: Number })
  @ApiQuery({ name: 'subjectId', required: false, description: 'Фильтр по ID предмета', type: Number })

  // Сортировка
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Поле для сортировки: subjDate или endDate',
    enum: ['subjDate', 'endDate'],
    example: 'subjDate'
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Порядок сортировки: asc или desc',
    enum: ['asc', 'desc'],
    example: 'asc'
  })

  @Get()
  findAll(
      @Query('page') page: number,
      @Query('limit') limit: number,
      @Query('teacherId') teacherId: number,
      @Query('classroomId') classroomId: number,
      @Query('groupId') groupId: number,
      @Query('subjectId') subjectId: number,
      @Query('sortBy') sortBy: 'subjDate' | 'endDate',
      @Query('sortOrder') sortOrder: 'asc' | 'desc',
  ) {
    return this.timetableService.findAll({
      page: Number(page),
      limit: Number(limit),
      teacherId: teacherId ? Number(teacherId) : undefined,
      classroomId: classroomId ? Number(classroomId) : undefined,
      groupId: groupId ? Number(groupId) : undefined,
      subjectId: subjectId ? Number(subjectId) : undefined,
      sortBy,
      sortOrder,
    });
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
