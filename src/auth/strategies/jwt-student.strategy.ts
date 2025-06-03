import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, UserRole } from '../types';

@Injectable()
export class JwtStudentStrategy extends PassportStrategy(
  Strategy,
  'jwt-student',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret_key',
    });
  }

  validate(payload: JwtPayload) {
    if (payload.role !== UserRole.STUDENT) {
      throw new UnauthorizedException('Только для студентов');
    }
    return payload;
  }
}
