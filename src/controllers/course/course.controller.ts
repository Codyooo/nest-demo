/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-15 15:47:43
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-17 11:16:35
 */
import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Body,
  ValidationPipe,
  Get,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CourseCreateDTO, CourseUpdateDTO, TimeCreateDTO } from './course.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('CourseController')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '新建课程' })
  async create(
    @Body(ValidationPipe)
    payload: CourseCreateDTO,
  ) {
    return await this.courseService.createOne(payload);
  }

  @Get()
  //   @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取全部课程' })
  async getAll() {
    return await this.courseService.findAll();
  }

  @Put(':id')
  //   @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '更新课程' })
  async updateOne(
    @Param('id', ParseUUIDPipe)
    id: string,
    @Body(ValidationPipe)
    payload: CourseUpdateDTO,
  ) {
    return await this.courseService.updateOne(id, payload);
  }

  @Delete(':id')
  //   @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '删除课程' })
  async deleteOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return await this.courseService.deleteOne(id);
  }
}
