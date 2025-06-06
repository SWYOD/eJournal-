import { Controller, Get, Param, Query } from '@nestjs/common';
import { MarkService } from './mark.service';
import { MarksFilterDto } from './dto/mark.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Marks')
@Controller('marks')
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Get('group/:groupId/average')
  @ApiOperation({ summary: 'Получение средних оценок группы за период' })
  @ApiResponse({ status: 200, description: 'Успешный запрос' })
  async getGroupAverageMarks(
    @Param('groupId') groupId: string,
    @Query() filter: MarksFilterDto
  ) {
    return this.markService.getAverageMarks({ ...filter, groupId });
  }
}