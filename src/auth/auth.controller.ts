/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:37:05
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-01 10:58:00
 */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { RegisterDTO, LoginDTO } from './dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body(ValidationPipe)
    registerDTO: RegisterDTO,
  ) {
    console.log('registerDTO', registerDTO);
    return await this.authService.register(registerDTO);
  }

  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        exceptionFactory: errors => new BadRequestException('密码格式错误'),
      }),
    )
    loginDTO: LoginDTO,
  ) {
    console.log('loginDTO', loginDTO);
    return await this.authService.login(loginDTO);
  }
}
