/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-01 11:56:14
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 16:50:12
 */
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('ProfileController')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private userService: UserService) {}

  @Get(':username')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取指定用户信息' })
  async getUserByName(
    @Param('username')
    username: string,
  ) {
    return await this.userService.getUserProfile(username);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取全部用户信息' })
  async getAllUser() {
    return await this.userService.findAll();
  }
}
