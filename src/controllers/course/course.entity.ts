/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:32:50
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-17 14:28:49
 */
import {
  Column,
  Entity,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/entity/abstract-entity';
import { IsEmail, IsOptional } from 'class-validator';
import { TimeEntity } from './time.entity';

@Entity('course')
export class CourseEntity extends AbstractEntity {
  @Column({ unique: true, comment: '课程名称' })
  name: string;

  @Column({ comment: '老师名称' })
  lecturer: string;

  @Column({ comment: '课程地点' })
  location: string;

  @Column({ comment: '备注', default: '' })
  @IsOptional()
  remarks: string;

  @Column({ comment: '上课时间' })
  time: string;

  @Column({ comment: '上课有效周' })
  validWeek: string;

  @OneToMany(
    type => TimeEntity,
    time => time.course,
    { cascade: true, eager: true },
  )
  course_time: TimeEntity[];
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
