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
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
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
  async findOne(@Param('id') id: number) {
    return this.teacherService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель обновлен' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  //@UseGuards(TeacherGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @ApiOperation({ summary: 'Удаление учителя' })
  @ApiResponse({ status: 200, description: 'Учитель удален' })
  @ApiResponse({ status: 404, description: 'Учитель не найден' })
  //@UseGuards(TeacherGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.teacherService.remove(id);
  }
}
