import {Injectable} from '@nestjs/common';
import {CreateStudentDto} from './dto/create-student.dto';
import {UpdateStudentDto} from './dto/update-student.dto';
import {Student} from "./students.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student)
              private readonly studentModel: typeof Student) {
  }
  async create(createStudentDto: CreateStudentDto) {

      return await this.studentModel.create(createStudentDto as Student);
  }

  async findAll() {
    return await this.studentModel.findAll();
  }

  async findOne(id: number) {
    return await this.studentModel.findByPk(id);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);
    return student?.update(updateStudentDto);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return student?.destroy();
  }
}
