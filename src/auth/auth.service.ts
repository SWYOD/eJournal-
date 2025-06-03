// auth.service.ts
import { Injectable } from '@nestjs/common';
import { TeachersService } from '../teachers/teachers.service';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from '../students/students.service';
import { JwtPayload, UserRole } from './types';
import bcrypt from 'bcrypt';
import { Student, Teacher } from '../../generated/prisma';


@Injectable()
export class AuthService {
  constructor(
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private jwtService: JwtService,
  ) {}

  async getUser(username: string){
    const student = await this.studentsService.findByUsername(username);
    if (student) return student;
    return await this.teachersService.findByUsername(username);
  }
  async validateUser(username: string, pass: string): Promise<any> {
    console.log('Поиск пользователя:', username);
    // Пробуем найти пользователя в обоих сервисах
    const user = await this.getUser(username);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return { ...result, role };
    }
    return null;
  }

  async login(user: any) {
    const payload: JwtPayload = {
      username: user.email,
      sub: user.id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
