import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';
import { Subject } from './subject.model';
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({ summary: 'Создание предмета' })
  @ApiResponse({ status: 201, description: 'Предмет успешно создан', type: Subject })
  @UseGuards(AuthGuard('student'))
  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectService.create(createSubjectDto);
  }

  @ApiOperation({ summary: 'Получение всех предметов' })
  @ApiResponse({ status: 200, description: 'Возвращает список предметов', type: [Subject] })
  @UseGuards(AuthGuard('student'))
  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @ApiOperation({ summary: 'Получение предмета по ID' })
  @ApiResponse({ status: 200, description: 'Предмет найден', type: Subject })
  @ApiResponse({ status: 404, description: 'Предмет не найден' })
  @UseGuards(AuthGuard('student'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Subject> {
    return this.subjectService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление предмета' })
  @ApiResponse({ status: 200, description: 'Предмет обновлён', type: Subject })
  @ApiResponse({ status: 404, description: 'Предмет не найден' })
  @UseGuards(AuthGuard('student'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @ApiOperation({ summary: 'Удаление предмета' })
  @ApiResponse({ status: 200, description: 'Предмет удалён' })
  @ApiResponse({ status: 404, description: 'Предмет не найден' })
  @UseGuards(AuthGuard('student'))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.subjectService.remove(id);
  }
}
