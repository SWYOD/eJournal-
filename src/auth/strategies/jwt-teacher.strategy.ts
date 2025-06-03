import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, UserRole } from '../types';

@Injectable()
export class JwtTeacherStrategy extends PassportStrategy(
  Strategy,
  'jwt-teacher',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret_key',
    });
  }

  validate(payload: JwtPayload) {
    if (payload.role !== UserRole.TEACHER) {
      throw new UnauthorizedException('Только для преподавателей');
    }
    return payload;
  }
}
