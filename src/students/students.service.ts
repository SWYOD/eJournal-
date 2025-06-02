import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../s3/s3.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      const hashedPassword = await bcrypt.hash(createStudentDto.password, 10);

      return await this.prisma.student.create({
        data: {
          ...createStudentDto,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          const field = error.meta?.target?.[0];
          throw new ConflictException(
            `Студент с таким ${field} уже существует`,
          );
        }
      }
      throw error;
    }
  }

  async uploadAvatar(id: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не был загружен');
    }

    const student = await this.findOne(id);

    // Удаляем старый аватар если есть
    if (student.avatar) {
      await this.s3Service.deleteFile(student.avatar);
    }

    // Загружаем новый файл
    const uploadResult = await this.s3Service.uploadFile(
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    // Обновляем запись студента
    return this.prisma.student.update({
      where: { id },
      data: { avatar: uploadResult.key },
    });
  }

  async uploadCover(id: number, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Файл не был загружен');
    }

    const student = await this.findOne(id);

    if (student.cover) {
      await this.s3Service.deleteFile(student.cover);
    }

    const uploadResult = await this.s3Service.uploadFile(
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    return this.prisma.student.update({
      where: { id },
      data: { cover: uploadResult.key },
    });
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        group: true,
      },
    });
  }

  async findOne(id: number | string) {
    const studentId = typeof id === 'string' ? Number(id) : id;
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { group: true },
    });

    if (!student) {
      throw new NotFoundException(`Студент с ID ${id} не найден`);
    }
    return student;
  }

  async findByUsername(email: string) {
    return this.prisma.student.findUnique({
      where: { email },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    // Проверяем существование студента
    await this.findOne(id);

    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    // Проверяем существование студента
    await this.findOne(id);

    return this.prisma.student.delete({
      where: { id },
    });
  }
  async getAllStudentMarks(studentId: number, subjectId?: number) {
    // Проверяем существование студента
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException(`Студент с ID ${studentId} не найден`);
    }

    // Формируем условия фильтрации
    const where: any = {
      studentId: studentId,
    };

    // Добавляем фильтр по предмету если передан
    if (subjectId !== undefined) {
      where.subjectId = subjectId;

      // Проверяем существование предмета
      const subject = await this.prisma.subject.findUnique({
        where: { id: subjectId },
      });

      if (!subject) {
        throw new NotFoundException(`Предмет с ID ${subjectId} не найден`);
      }
    }

    // Получаем оценки с информацией о предметах
    return this.prisma.mark.findMany({
      where,
      include: {
        subject: true,
      },
      orderBy: {
        createdAt: 'desc', // Сортировка по дате оценки (новые сначала)
      },
    });
  }
}
