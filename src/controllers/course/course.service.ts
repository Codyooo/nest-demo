/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-15 15:46:25
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-17 14:36:35
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CourseCreateDTO, CourseUpdateDTO, TimeCreateDTO } from './course.dto';
import { TimeEntity } from './time.entity';
import { countReset } from 'console';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private courseRepo: Repository<CourseEntity>,

    @InjectRepository(TimeEntity)
    private timeRepo: Repository<TimeEntity>,
  ) {}

  async createOne(payload: CourseCreateDTO) {
    const course = this.courseRepo.create(payload);
    await course.save();

    const { courseTime } = payload;

    courseTime.forEach(async ({ week, section }) => {
      const time = this.timeRepo.create({ week, section });
      time.course = course;
      await time.save();
    });

    return course;
  }

  async findOne(courseId: string) {
    const course = await this.courseRepo.findOne(courseId);
    return course;
  }

  async findAll() {
    const course = await this.courseRepo.find();

    return course;
  }

  async updateOne(courseId: string, payload: CourseUpdateDTO) {
    const { courseTime = [], ...rest } = payload;
    if (Object.keys(rest).length > 0)
      await this.courseRepo.update({ id: courseId }, rest);

    const course = await this.courseRepo.findOne(courseId);

    if (courseTime.length > 0) course.course_time = courseTime;

    return (await course.save()).toJSON();
  }

  async copy(courseId: string) {
    const course = await this.courseRepo.findOne(courseId);
    return course;
  }

  async deleteOne(courseId: string) {
    await this.courseRepo.delete(courseId);
  }
}
