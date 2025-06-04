import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MarkService } from './mark.service';
import {
  CreateMarkDto,
  UpdateMarkDto,
  PeriodFilterDto,
  GroupMarksResponseDto,
} from './dto/mark.dto';
import { StudentGuard } from '../auth/guards/student.guard';
import { TeacherGuard } from '../auth/guards/teacher.guard';


@ApiTags('Marks')
@Controller('marks')
@ApiBearerAuth()
@UseGuards(StudentGuard, TeacherGuard)
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @ApiOperation({ summary: 'Создать оценку' })
  @ApiResponse({ status: 201, description: 'Оценка создана' })

  @Post()
  create(@Body() createMarkDto: CreateMarkDto) {
    return this.markService.create(createMarkDto);
  }

  @ApiOperation({ summary: 'Получить средние оценки по группе за период' })
  @ApiResponse({
    status: 200,
    description: 'Средние оценки за период',
    type: [GroupMarksResponseDto],
  })

  @Get('group/:groupId/average')
  getGroupAverageMarks(
    @Param('groupId') groupId: number,
    @Query() filter: PeriodFilterDto,
  ) {
    return this.markService.getGroupAverageMarks(+groupId, filter.period);
  }

  @ApiOperation({ summary: 'Обновить оценку' })
  @ApiResponse({ status: 200, description: 'Оценка обновлена' })
  @UseGuards(StudentGuard, TeacherGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMarkDto: UpdateMarkDto) {
    return this.markService.update(+id, updateMarkDto);
  }

  @ApiOperation({ summary: 'Удалить оценку' })
  @ApiResponse({ status: 200, description: 'Оценка удалена' })
  @UseGuards(StudentGuard, TeacherGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.markService.remove(+id);
  }
}
