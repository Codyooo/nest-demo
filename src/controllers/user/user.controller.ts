/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:34:55
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 11:40:24
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('UserController')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @User()
    user,
  ) {
    await this.userService.getUserProfile(user.username);
  }
}
