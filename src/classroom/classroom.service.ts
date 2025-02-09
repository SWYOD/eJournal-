import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Classroom } from './сlassroom.model';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
      @InjectModel(Classroom)
      private readonly classroomModel: typeof Classroom,
  ) {}

  async create(createClassroomDto: CreateClassroomDto): Promise<Classroom> {
    return await this.classroomModel.create(createClassroomDto as Classroom);
  }

  async findAll(): Promise<Classroom[]> {
    return await this.classroomModel.findAll();
  }

  async findOne(id: number): Promise<Classroom> {
    const classroom = await this.classroomModel.findByPk(id);
    if (!classroom) {
      throw new NotFoundException(`Аудитория с ID ${id} не найдена`);
    }
    return classroom;
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto): Promise<Classroom> {
    const classroom = await this.findOne(id);
    await classroom.update(updateClassroomDto);
    return classroom;
  }

  async remove(id: number): Promise<void> {
    const classroom = await this.findOne(id);
    await classroom.destroy();
  }
}
