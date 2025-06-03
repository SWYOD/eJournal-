import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { StudentsModule } from '../students/students.module';
import { LocalStrategy } from './local.strategy';
import { TeachersModule } from '../teachers/teachers.module';
import { JwtStudentStrategy } from './strategies/jwt-student.strategy';
import { JwtTeacherStrategy } from './strategies/jwt-teacher.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '1h' },
    }),
    StudentsModule,
    TeachersModule, // <-- Добавляем модуль преподавателей
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStudentStrategy, // <-- Новая стратегия
    JwtTeacherStrategy, // <-- Новая стратегия
  ],
  controllers: [AuthController],
})
export class AuthModule {}
