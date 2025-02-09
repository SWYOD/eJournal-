import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teachers.model';
import { CreateTeacherDto, UpdateTeacherDto } from './dto/teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
      @InjectModel(Teacher)
      private readonly teacherModel: typeof Teacher,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return await this.teacherModel.create(createTeacherDto as Teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return await this.teacherModel.findAll();
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherModel.findByPk(id);
    if (!teacher) {
      throw new NotFoundException(`Учитель с ID ${id} не найден`);
    }
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<Teacher> {
    const teacher = await this.findOne(id);
    await teacher.update(updateTeacherDto);
    return teacher;
  }

  async remove(id: number): Promise<void> {
    const teacher = await this.findOne(id);
    await teacher.destroy();
  }
}
