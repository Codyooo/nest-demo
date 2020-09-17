/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:37:05
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 16:45:42
 */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  BadRequestException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { RegisterDTO, LoginDTO, UserRoleChangeDTO } from './dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/controllers/user/user.entity';
import { RbacGuard } from 'src/guards/rbac.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('AuthController')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '用户注册' })
  @Post('register')
  async register(
    @Body(ValidationPipe)
    payload: RegisterDTO,
  ) {
    return await this.authService.register(payload);
  }

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  @Post('login')
  async login(
    @Body(
      new ValidationPipe({
        exceptionFactory: errors => new BadRequestException('密码格式错误'),
      }),
    )
    payload: LoginDTO,
  ) {
    return await this.authService.login(payload);
  }

  @ApiOperation({ summary: '授权管理' })
  @ApiBody({
    description: '用户授权',
    type: UserRoleChangeDTO,
  })
  @UseGuards(new RbacGuard(Roles.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Post('role')
  async RoleChange(
    @Body(ValidationPipe)
    payload: UserRoleChangeDTO,
  ) {
    return await this.authService.roleChange(payload);
  }

  @ApiOperation({ summary: '获取全部用户' })
  @UseGuards(new RbacGuard(Roles.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }
}
