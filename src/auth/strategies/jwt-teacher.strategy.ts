import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, UserRole } from '../types';
import { TeachersService } from '../../teachers/teachers.service'; // Добавляем импорт

@Injectable()
export class JwtTeacherStrategy extends PassportStrategy(
  Strategy,
  'jwt-teacher',
) {
  constructor(private teachersService: TeachersService) { // Инжектируем сервис
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret_key',
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.role !== UserRole.TEACHER) {
      throw new UnauthorizedException('Только для преподавателей');
    }

    // Проверяем существование пользователя
    const user = await this.teachersService.findOne(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return payload;
  }
}