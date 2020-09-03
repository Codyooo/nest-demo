/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:34:55
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-01 11:05:08
 */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';
import { User } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(
    @User()
    user,
  ) {
    console.log('user', user);
    await this.userService.getUserProfile(user.username);
  }
}
