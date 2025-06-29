import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import {
  CreateTeacherDto,
  UpdateTeacherDto,
  AssignSubjectsDto,
  AssignGroupsDto,
} from './dto/teacher.dto';
import { TeacherGuard } from '../auth/guards/teacher.guard';

@ApiTags('Teachers')
@Controller('teachers')
@ApiBearerAuth()
export class TeachersController {
  constructor(private readonly teacherService: TeachersService) {}

  @ApiOperation({ summary: 'Создание учителя' })
  @ApiResponse({ status: 201, description: 'Учитель успешно создан' })
  //@UseGuards(TeacherGuard)
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @ApiOperation({ summary: 'Получение всех учителей' })
  @ApiResponse({ status: 200, description: 'Возвращает список учителей' })
  //@UseGuards(TeacherGuard)
  @Get()
  async findAll() {
    return this.teacherService.findAll();
  }

  @ApiOperation({ summary: 'Получение учителя по ID' })
  @ApiResponse({ status: 200, description: 'Учитель найден' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  //@UseGuards(TeacherGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель обновлен' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  //@UseGuards(TeacherGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(Number(id), updateTeacherDto);
  }

  @ApiOperation({ summary: 'Удаление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель удален' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  //@UseGuards(TeacherGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.teacherService.remove(Number(id));
  }

  @ApiOperation({ summary: 'Присвоить предметы преподавателю' })
  @ApiResponse({
    status: 200,
    description: 'Предметы успешно присвоены преподавателю',
  })
  @ApiResponse({
    status: 404,
    description: 'Преподаватель или предметы не найдены',
  })
  //@UseGuards(TeacherGuard)
  @Post(':id/subjects')
  async assignSubjects(
    @Param('id') id: string,
    @Body() assignSubjectsDto: AssignSubjectsDto,
  ) {
    return this.teacherService.assignSubjects(
      Number(id),
      assignSubjectsDto.subjectIds,
    );
  }

  @ApiOperation({ summary: 'Присвоить группы преподавателю' })
  @ApiResponse({
    status: 200,
    description: 'Группы успешно присвоены преподавателю',
  })
  @ApiResponse({
    status: 404,
    description: 'Преподаватель или группы не найдены',
  })
  //@UseGuards(TeacherGuard)
  @Post(':id/groups')
  async assignGroups(
    @Param('id') id: string,
    @Body() assignGroupsDto: AssignGroupsDto,
  ) {
    return this.teacherService.assignGroups(
      Number(id),
      assignGroupsDto.groupIds,
    );
  }
}
