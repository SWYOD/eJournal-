import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from './groups.service';
import { CreateGroupDto, UpdateGroupDto } from './dto/create-group.dto';
import { Group } from './groups.model';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}

  @ApiOperation({ summary: 'Создание группы' })
  @ApiResponse({ status: 201, description: 'Группа успешно создана', type: Group })
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  @ApiOperation({ summary: 'Получение всех групп' })
  @ApiResponse({ status: 200, description: 'Возвращает список групп', type: [Group] })
  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @ApiOperation({ summary: 'Получение группы по ID' })
  @ApiResponse({ status: 200, description: 'Группа найдена', type: Group })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновление группы' })
  @ApiResponse({ status: 200, description: 'Группа обновлена', type: Group })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupService.update(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Удаление группы' })
  @ApiResponse({ status: 200, description: 'Группа удалена' })
  @ApiResponse({ status: 404, description: 'Группа не найдена' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.groupService.remove(id);
  }
}
