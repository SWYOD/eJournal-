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

  async validateUser(username: string, pass: string): Promise<any> {
    // Пробуем найти пользователя в обоих сервисах
    const student = await this.studentsService.findByUsername(username);
    let role = UserRole.STUDENT;
    let user;
    if (!student) {
      user = await this.teachersService.findByUsername(username);
      role = UserRole.TEACHER;
    } else {
      user = student;
    }
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
