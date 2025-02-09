import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './subject.model';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectService {
  constructor(
      @InjectModel(Subject)
      private readonly subjectModel: typeof Subject,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectModel.create(createSubjectDto as Subject);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectModel.findAll();
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectModel.findByPk(id);
    if (!subject) {
      throw new NotFoundException(`Предмет с ID ${id} не найден`);
    }
    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findOne(id);
    await subject.update(updateSubjectDto);
    return subject;
  }

  async remove(id: number): Promise<void> {
    const subject = await this.findOne(id);
    await subject.destroy();
  }
}
