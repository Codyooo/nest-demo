/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-15 15:46:15
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-16 15:58:10
 */
import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { TimeEntity } from './time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, TimeEntity])],
  providers: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
