import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';

@ApiTags('Subjects')
@Controller('subjects')
@ApiBearerAuth()
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Создание предмета' })
  @ApiResponse({ status: 201, description: 'Предмет успешно создан'})
  // @UseGuards(AuthGuard('student'))
  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @ApiOperation({ summary: 'Получение всех предметов' })
  @ApiResponse({ status: 200, description: 'Возвращает список предметов' })
  // @UseGuards(AuthGuard('student'))
  @Get()
  async findAll() {
    return this.subjectService.findAll();
  }

  @ApiOperation({ summary: 'Получение предмета по ID' })
  @ApiResponse({ status: 200, description: 'Предмет найден' })
  @ApiResponse({ status: 404, description: 'Предмет не найден' })
  // @UseGuards(AuthGuard('student'))
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.subjectService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление предмета' })
  @ApiResponse({ status: 200, description: 'Предмет обновлён'})
  @ApiResponse({ status: 404, description: 'Предмет не найден' })
  // @UseGuards(AuthGuard('student'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @ApiOperation({ summary: 'Удаление предмета' })
  @ApiResponse({ status: 200, description: 'Предмет удалён' })
  @ApiResponse({ status: 404, description: 'Предмет не найден' })
  // @UseGuards(AuthGuard('student'))
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.subjectService.remove(id);
  }
}
