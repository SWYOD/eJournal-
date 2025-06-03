import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class StudentGuard extends AuthGuard('jwt-student') {}