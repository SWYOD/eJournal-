import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Classroom } from './сlassroom.model';
import { CreateClassroomDto, UpdateClassroomDto } from './dto/create-classroom.dto';

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

  async findOne(id: number): Promise<Classroom | null> {
    return await this.classroomModel.findByPk(id);
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto): Promise<[number, Classroom[]]> {
    return await this.classroomModel.update(updateClassroomDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return await this.classroomModel.destroy({ where: { id } });
  }
}