/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-01 11:56:14
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 10:17:35
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ProfileController')
@Controller('profile')
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  async getUserByName(
    @Param('username')
    username: string,
  ) {
    return await this.userService.getUserProfile(username);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUser() {
    return await this.userService.findAll();
  }
}
