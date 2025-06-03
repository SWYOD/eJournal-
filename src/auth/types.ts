export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export interface JwtPayload {
  sub: string;
  username: string;
  role: UserRole;
}