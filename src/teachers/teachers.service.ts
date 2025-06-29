import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateTeacherDto,
  UpdateTeacherDto,
  AssignSubjectsDto,
  AssignGroupsDto,
} from './dto/teacher.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 10);

    return this.prisma.teacher.create({
      data: {
        name: createTeacherDto.name,
        email: createTeacherDto.email,
        password: hashedPassword,
        subjects: createTeacherDto.subjectIds
          ? { connect: createTeacherDto.subjectIds.map((id) => ({ id })) }
          : undefined,
        groups: createTeacherDto.groupIds
          ? { connect: createTeacherDto.groupIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        subjects: true,
        groups: true,
      },
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: {
        subjects: true,
        groups: true,
      },
    });
  }

  async findOne(id: number | string) {
    const teacherId = typeof id === 'string' ? Number(id) : id;
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        subjects: true,
        groups: true,
      },
    });

    if (!teacher) {
      throw new NotFoundException(`Учитель с ID ${id} не найден`);
    }
    return teacher;
  }

  async findByUsername(email: string) {
    return this.prisma.teacher.findUnique({
      where: { email },
      include: {
        subjects: true,
        groups: true,
      },
    });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    await this.findOne(id);

    return this.prisma.teacher.update({
      where: { id },
      data: {
        name: updateTeacherDto.name,
        subjects:
          updateTeacherDto.subjectIds !== undefined
            ? { set: updateTeacherDto.subjectIds.map((id) => ({ id })) }
            : undefined,
        groups:
          updateTeacherDto.groupIds !== undefined
            ? { set: updateTeacherDto.groupIds.map((id) => ({ id })) }
            : undefined,
      },
      include: {
        subjects: true,
        groups: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.teacher.delete({
      where: { id },
      include: {
        subjects: true,
        groups: true,
      },
    });
  }

  async assignSubjects(teacherId: number, subjectIds: number[]) {
    const teacher = await this.findOne(teacherId);

    const existingSubjects = await this.prisma.subject.findMany({
      where: { id: { in: subjectIds } },
    });

    if (existingSubjects.length !== subjectIds.length) {
      const missingIds = subjectIds.filter(
        (id) => !existingSubjects.some((s) => s.id === id),
      );
      throw new NotFoundException(
        `Предметы с ID: ${missingIds.join(', ')} не найдены`,
      );
    }

    return this.prisma.teacher.update({
      where: { id: teacherId },
      data: {
        subjects: {
          set: subjectIds.map((id) => ({ id })),
        },
      },
      include: {
        subjects: true,
        groups: true,
      },
    });
  }

  async assignGroups(teacherId: number, groupIds: number[]) {
    const teacher = await this.findOne(teacherId);

    const existingGroups = await this.prisma.group.findMany({
      where: { id: { in: groupIds } },
    });

    if (existingGroups.length !== groupIds.length) {
      const missingIds = groupIds.filter(
        (id) => !existingGroups.some((g) => g.id === id),
      );
      throw new NotFoundException(
        `Группы с ID: ${missingIds.join(', ')} не найдены`,
      );
    }

    return this.prisma.teacher.update({
      where: { id: teacherId },
      data: {
        groups: {
          set: groupIds.map((id) => ({ id })),
        },
      },
      include: {
        subjects: true,
        groups: true,
      },
    });
  }
}
