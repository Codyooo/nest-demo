/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 15:51:45
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-17 14:28:40
 */
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  @Exclude()
  created_at: Date;
  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
  @DeleteDateColumn()
  @Exclude()
  deleted_at: Date;

  toJSON() {
    return classToPlain(this);
  }
}
