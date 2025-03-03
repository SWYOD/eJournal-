import {BadRequestException, ConflictException, Injectable, NotFoundException, UseGuards} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Student} from './students.model';
import {CreateStudentDto, UpdateStudentDto} from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';
import {UniqueConstraintError} from "sequelize";
import {S3Service} from "../s3/s3.service";


@Injectable()
export class StudentsService {
  constructor(
      @InjectModel(Student)
      private readonly studentModel: typeof Student,
      private readonly s3Service: S3Service
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      createStudentDto.password = await bcrypt.hash(createStudentDto.password, 10);
      return await this.studentModel.create(createStudentDto as Student);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        this.handleUniqueConstraintError(error);
      }
      throw error;
    }
  }
  async uploadAvatar(id: number, file: Express.Multer.File): Promise<Student> {
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
        file.mimetype
    );

    // Обновляем запись студента
    return student.update({ avatar: uploadResult.key });
  }

  async uploadCover(id: number, file: Express.Multer.File): Promise<Student> {
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
        file.mimetype
    );

    return student.update({ cover: uploadResult.key });
  }

  async findAll(): Promise<Student[]> {
    return await this.studentModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentModel.findByPk(id, { include: { all: true } });
    if (!student) {
      throw new NotFoundException(`Студент с ID ${id} не найден`);
    }
    return student;
  }
  async findByUsername(email: string){
      return await this.studentModel.findOne({
          where: {
              email
          }
      })
  }
  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    await student.update(updateStudentDto);
    return student;
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await student.destroy();
  }
  private handleUniqueConstraintError(error: UniqueConstraintError) {
    throw new ConflictException(error.message);
  }
}
