import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto } from './dto/create-group.dto';

@ApiTags('Groups')
@Controller('groups')
@ApiBearerAuth()
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @ApiOperation({ summary: 'Создание группы' })
  @ApiResponse({ status: 201, description: 'Группа успешно создана'})
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ summary: 'Получение всех групп' })
  @ApiResponse({ status: 200, description: 'Возвращает список групп' })
  @Get()
  async findAll() {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: 'Получение группы по ID' })
  @ApiResponse({ status: 200, description: 'Группа найдена' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.groupService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление группы' })
  @ApiResponse({ status: 200, description: 'Группа обновлена'})
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Удаление группы' })
  @ApiResponse({ status: 200, description: 'Группа удалена' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.groupService.remove(id);
  }
}
