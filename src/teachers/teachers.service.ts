import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    return this.prisma.teacher.create({
      data: createTeacherDto
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany();
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id }
    });

    if (!teacher) {
      throw new NotFoundException(`Учитель с ID ${id} не найден`);
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    // Проверяем существование учителя
    await this.findOne(id);

    return this.prisma.teacher.update({
      where: { id },
      data: updateTeacherDto
    });
  }

  async remove(id: number) {
    // Проверяем существование учителя
    await this.findOne(id);

    return this.prisma.teacher.delete({
      where: { id }
    });
  }
}