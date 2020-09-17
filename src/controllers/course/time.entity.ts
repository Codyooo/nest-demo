import { classToPlain, Exclude } from 'class-transformer';
/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:32:50
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-17 14:27:56
 */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

export enum WEEK_ENUM {
  Monday = 1,
  Tuesday,
  Wednesday,
  ThursDay,
  Friday,
  Saturday,
  Sunday,
}

export enum SECTION_ENUM {
  SECTION1 = 1,
  SECTION2,
  SECTION3,
  SECTION4,
  SECTION5,
  SECTION6,
  SECTION7,
  SECTION8,
  SECTION9,
  SECTION10,
  SECTION11,
  SECTION12,
}

@Entity('course_time')
export class TimeEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: number;

  @Column({ comment: '星期' })
  week: WEEK_ENUM;

  @Column({ comment: '节数' })
  section: SECTION_ENUM;

  @ManyToOne(
    type => CourseEntity,
    course => course.course_time,
    { onDelete: 'CASCADE' },
  )
  course: CourseEntity;

  toJSON() {
    return classToPlain(this);
  }
}

export const TimeMap = {
  1: '08:00 - 08:45',
  2: '08:55 - 09:40',
  3: '10:00 - 10:45',
  4: '10:55 - 11:40',
  5: '13:30 - 14:15',
  6: '14:25 - 15:30',
  7: '15:30 - 16:15',
  8: '16:25 - 17:10',
  9: '18:00 - 18:45',
  10: '18:55 - 19:40',
  11: '19:50 - 20:35',
  12: '20:45 - 21:30',
};
