import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Timetable } from './timetable.model';
import { CreateTimetableDto, UpdateTimetableDto } from './dto/timetable.dto';

@Injectable()
export class TimetableService {
  constructor(
      @InjectModel(Timetable)
      private readonly timetableModel: typeof Timetable,
  ) {}

  async create(createTimetableDto: CreateTimetableDto): Promise<Timetable> {
    return await this.timetableModel.create(createTimetableDto as Timetable);
  }

  async findAll(): Promise<Timetable[]> {
    return await this.timetableModel.findAll();
  }

  async findOne(id: number): Promise<Timetable> {
    const timetable = await this.timetableModel.findByPk(id);
    if (!timetable) {
      throw new NotFoundException(`Запись расписания с ID ${id} не найдена`);
    }
    return timetable;
  }

  async update(id: number, updateTimetableDto: UpdateTimetableDto): Promise<Timetable> {
    const timetable = await this.findOne(id);
    await timetable.update(updateTimetableDto);
    return timetable;
  }

  async remove(id: number): Promise<void> {
    const timetable = await this.findOne(id);
    await timetable.destroy();
  }
}
