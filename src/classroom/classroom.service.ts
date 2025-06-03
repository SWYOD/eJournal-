import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/classroom.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClassroomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClassroomDto: CreateClassroomDto) {
    return this.prisma.classroom.create({
      data: createClassroomDto,
    });
  }

  async findAll() {
    return this.prisma.classroom.findMany();
  }

  async findOne(id: number | string) {
    const classroomId = typeof id === 'string' ? Number(id) : id;
    const classroom = await this.prisma.classroom.findUnique({
      where: { id: classroomId },
    });

    if (!classroom) {
      throw new NotFoundException(`Аудитория с ID ${id} не найдена`);
    }
    return classroom;
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    // Проверяем существование записи
    await this.findOne(id);

    return this.prisma.classroom.update({
      where: { id },
      data: updateClassroomDto,
    });
  }

  async remove(id: number) {
    // Проверяем существование записи
    await this.findOne(id);

    return this.prisma.classroom.delete({
      where: { id },
    });
  }
}
