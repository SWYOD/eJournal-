// auth/auth.controller.ts
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with username and password',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      default: {
        value: {
          username: 'user@example.com',
          password: 'P@ssw0rd123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login with JWT token',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
