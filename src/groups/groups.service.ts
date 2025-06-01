import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto, UpdateGroupDto } from './dto/create-group.dto';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GroupsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.prisma.group.create({
      data: createGroupDto
    });
  }

  async findAll() {
    return this.prisma.group.findMany({
      include: {
        students: true,
        timetables: true
      }
    });
  }

  async findOne(id: number) {
    const group = await this.prisma.group.findUnique({
      where: { id },
      include: {
        students: true,
        timetables: true
      }
    });

    if (!group) {
      throw new NotFoundException(`Группа с ID ${id} не найдена`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    // Проверяем существование группы
    await this.findOne(id);

    return this.prisma.group.update({
      where: { id },
      data: updateGroupDto
    });
  }

  async remove(id: number) {
    // Проверяем существование группы
    await this.findOne(id);

    return this.prisma.group.delete({
      where: { id }
    });
  }
}