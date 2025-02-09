import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './students.model';
import { CreateStudentDto, UpdateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
      @InjectModel(Student)
      private readonly studentModel: typeof Student,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentModel.create(createStudentDto as Student);
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

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    await student.update(updateStudentDto);
    return student;
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await student.destroy();
  }
}
