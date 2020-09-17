/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-15 16:55:20
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-16 18:13:51
 */
import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SECTION_ENUM, TimeEntity, WEEK_ENUM } from './time.entity';

export class CourseCreateDTO {
  @IsString()
  @ApiProperty({ required: true, example: '课程1', description: '课程名称' })
  name: string;
  @IsString()
  @ApiProperty({ required: true, example: '张三', description: '老师姓名' })
  lecturer: string;

  @IsString()
  @ApiProperty({ required: true, example: '二教203', description: '上课地点' })
  location: string;

  @IsString()
  @ApiProperty({ required: true, example: '104', description: '上课时间' })
  time: string;

  @IsArray()
  @ApiProperty({
    required: true,
    example: [
      {
        week: 1,
        section: 1,
      },
    ],
    description: '星期',
    isArray: true,
    type: TimeEntity,
  })
  courseTime: TimeEntity[];

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '[2-17]', description: '课程有效期' })
  validWeek: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '', description: '课程备注' })
  remarks?: string;
}

export class CourseUpdateDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '课程1', description: '课程名称' })
  name: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '张三', description: '老师姓名' })
  lecturer: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '二教203', description: '上课地点' })
  location: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '104', description: '上课时间' })
  time: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    required: true,
    example: [
      {
        week: 1,
        section: 1,
      },
    ],
    description: '星期',
    isArray: true,
    type: TimeEntity,
  })
  courseTime: TimeEntity[];

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '[2-17]', description: '课程有效期' })
  validWeek: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: true, example: '', description: '课程备注' })
  remarks?: string;
}

export class TimeCreateDTO {
  @IsEnum(WEEK_ENUM)
  @ApiProperty({
    required: true,
    example: WEEK_ENUM.Monday,
    description: '星期',
    enum: WEEK_ENUM,
  })
  week: WEEK_ENUM;
  @IsEnum(SECTION_ENUM)
  @ApiProperty({
    required: true,
    example: SECTION_ENUM.SECTION1,
    description: '节数',
    enum: SECTION_ENUM,
  })
  section: SECTION_ENUM;
}
