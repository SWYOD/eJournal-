// auth.service.ts
import {Injectable, UnauthorizedException} from '@nestjs/common';
import { TeachersService } from '../teachers/teachers.service';
import { JwtService } from '@nestjs/jwt';
import { StudentsService } from '../students/students.service';
import { JwtPayload, UserRole } from './types';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private jwtService: JwtService,
  ) {}


  async validateUser(username: string, pass: string): Promise<any> {
    const student = await this.studentsService.findByUsername(username);
    if(student) return await this.validateStudent(student, pass)
    const teacher = await this.teachersService.findByUsername(username);
    if(teacher) return await this.validateTeacher(teacher, pass)
  }
  async validateStudent(student, pass){
    if(await bcrypt.compare(pass, student.password)){
      const role = UserRole.STUDENT
      return { ...student, role };
    }
  }
  async validateTeacher(teacher, pass){
    if(await bcrypt.compare(pass, teacher.password)){
      const role = UserRole.TEACHER
      return { ...teacher, role };
    }
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
