import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './groups.model';
import { CreateGroupDto, UpdateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupsService {
  constructor(
      @InjectModel(Group)
      private readonly groupModel: typeof Group,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupModel.create(createGroupDto as Group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupModel.findByPk(id, { include: { all: true } });
    if (!group) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    await group.update(updateGroupDto);
    return group;
  }

  async remove(id: number): Promise<void> {
    const group = await this.findOne(id);
    await group.destroy();
  }
}
