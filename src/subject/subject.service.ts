import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMarkDto,
  CreateSubjectDto,
  UpdateMarkDto,
  UpdateSubjectDto,
} from './dto/subject.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: createSubjectDto,
    });
  }

  async findAll() {
    return this.prisma.subject.findMany();
  }

  async findOne(id: number | string) {
    const subjectId = typeof id === 'string' ? Number(id) : id;
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      throw new NotFoundException(`Предмет с ID ${id} не найден`);
    }
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    // Проверяем существование предмета
    await this.findOne(id);

    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  async remove(id: number) {
    // Проверяем существование предмета
    await this.findOne(id);

    return this.prisma.subject.delete({
      where: { id },
    });
  }
  async addMark(createMarkDto: CreateMarkDto) {
    // Проверяем существование предмета и студента
    const [subject, student] = await Promise.all([
      this.prisma.subject.findUnique({
        where: { id: Number(createMarkDto.subjectId) },
      }),
      this.prisma.student.findUnique({
        where: { id: Number(createMarkDto.studentId) },
      }),
    ]);

    if (!subject) {
      throw new NotFoundException(
        `Предмет с ID ${createMarkDto.subjectId} не найден`,
      );
    }
    if (!student) {
      throw new NotFoundException(
        `Студент с ID ${createMarkDto.studentId} не найден`,
      );
    }
    if (createMarkDto.value < 1 || createMarkDto.value > 5) {
      throw new BadRequestException('Оценка должна быть в диапазоне от 1 до 5');
    }

    return this.prisma.mark.create({
      data: {
        value: Number(createMarkDto.value),
        subjectId: Number(createMarkDto.subjectId),
        studentId: Number(createMarkDto.studentId),
      },
    });
  }

  /**
   * Обновить оценку
   */
  async updateMark(markId: number, updateMarkDto: UpdateMarkDto) {
    const mark = await this.prisma.mark.findUnique({
      where: { id: markId },
    });

    if (!mark) {
      throw new NotFoundException(`Оценка с ID ${markId} не найдена`);
    }
    if (
      updateMarkDto.value &&
      (updateMarkDto.value < 1 || updateMarkDto.value > 5)
    ) {
      throw new BadRequestException('Оценка должна быть в диапазоне от 1 до 5');
    }

    return this.prisma.mark.update({
      where: { id: markId },
      data: updateMarkDto,
    });
  }

  /**
   * Удалить оценку
   */
  async removeMark(markId: number) {
    const mark = await this.prisma.mark.findUnique({
      where: { id: markId },
    });

    if (!mark) {
      throw new NotFoundException(`Оценка с ID ${markId} не найдена`);
    }

    return this.prisma.mark.delete({
      where: { id: markId },
    });
  }

  /**
   * Получить оценки по предмету
   */
  async getSubjectMarks(subjectId: number) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
      include: {
        marks: {
          include: {
            student: true,
          },
        },
      },
    });

    if (!subject) {
      throw new NotFoundException(`Предмет с ID ${subjectId} не найден`);
    }

    return subject.marks;
  }

  /**
   * Получить оценки студента по предмету
   */
  async getStudentMarksForSubject(studentId: number, subjectId: number) {
    const [student, subject] = await Promise.all([
      this.prisma.student.findUnique({ where: { id: studentId } }),
      this.prisma.subject.findUnique({ where: { id: subjectId } }),
    ]);

    if (!student) {
      throw new NotFoundException(`Студент с ID ${studentId} не найден`);
    }
    if (!subject) {
      throw new NotFoundException(`Предмет с ID ${subjectId} не найден`);
    }

    return this.prisma.mark.findMany({
      where: {
        studentId,
        subjectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
