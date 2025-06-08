import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MarkService } from './mark.service';
import {
  CreateMarkDto,
  UpdateMarkDto,
  MarksByPeriodDto,
  MarkResponseDto,
  MarksByStudentResponseDto,
  MarksByGroupResponseDto,
} from './dto/mark.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Оценки')
@Controller('marks')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую оценку' })
  @ApiBody({ type: CreateMarkDto })
  @ApiCreatedResponse({
    description: 'Оценка успешно создана',
    type: MarkResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Неверные входные данные' })
  create(@Body() dto: CreateMarkDto) {
    return this.markService.createMark(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить оценку' })
  @ApiParam({ name: 'id', description: 'ID оценки', example: 1 })
  @ApiBody({ type: UpdateMarkDto })
  @ApiOkResponse({
    description: 'Оценка успешно обновлена',
    type: MarkResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Оценка не найдена' })
  @ApiBadRequestResponse({ description: 'Неверные входные данные' })
  update(@Param('id') id: string, @Body() dto: UpdateMarkDto) {
    return this.markService.updateMark(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить оценку' })
  @ApiParam({ name: 'id', description: 'ID оценки', example: 1 })
  @ApiOkResponse({ description: 'Оценка успешно удалена' })
  @ApiNotFoundResponse({ description: 'Оценка не найдена' })
  remove(@Param('id') id: string) {
    return this.markService.deleteMark(+id);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Получить оценки студента' })
  @ApiParam({ name: 'studentId', description: 'ID студента', example: 1 })
  @ApiOkResponse({
    description: 'Оценки студента сгруппированные по предметам',
    type: MarksByStudentResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Студент не найден' })
  getByStudent(@Param('studentId') studentId: string) {
    return this.markService.getMarksByStudent(+studentId);
  }

  @Get('group/:groupId')
  @ApiOperation({ summary: 'Получить оценки группы' })
  @ApiParam({ name: 'groupId', description: 'ID группы', example: 1 })
  @ApiOkResponse({
    description: 'Оценки группы сгруппированные по предметам',
    type: MarksByGroupResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Группа не найдена' })
  getByGroup(@Param('groupId') groupId: string) {
    return this.markService.getMarksByGroup(+groupId);
  }

  @Get('period')
  @ApiOperation({ summary: 'Получить оценки за период' })
  @ApiQuery({ name: 'startDate', type: String, example: '2023-05-01' })
  @ApiQuery({ name: 'endDate', type: String, example: '2023-05-31' })
  @ApiQuery({ name: 'groupIds', required: false, type: [Number] })
  @ApiQuery({ name: 'subjectIds', required: false, type: [Number] })
  @ApiOkResponse({
    description: 'Список оценок за указанный период',
    type: [MarkResponseDto],
  })
  @ApiBadRequestResponse({ description: 'Неверные параметры запроса' })
  getByPeriod(@Query() dto: MarksByPeriodDto) {
    return this.markService.getMarksByPeriod(dto);
  }
}
