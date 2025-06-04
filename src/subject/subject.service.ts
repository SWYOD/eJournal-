import {
  BadRequestException,
  ForbiddenException,
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
}
