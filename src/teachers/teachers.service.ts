import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);

    return this.prisma.teacher.create({
      data: {
        ...createTeacherDto,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany();
  }

  async findOne(id: number | string) {
    const teacherId = typeof id === 'string' ? Number(id) : id;
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      throw new NotFoundException(`Учитель с ID ${id} не найден`);
    }
    return teacher;
  }

  async findByUsername(email: string) {
    return this.prisma.teacher.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    // Проверяем существование учителя
    await this.findOne(id);

    return this.prisma.teacher.update({
      where: { id },
      data: updateTeacherDto,
    });
  }

  async remove(id: number) {
    // Проверяем существование учителя
    await this.findOne(id);

    return this.prisma.teacher.delete({
      where: { id },
    });
  }
}
