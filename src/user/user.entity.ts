/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:32:50
 * @LastEditors: hufan
 * @LastEditTime: 2020-08-31 17:42:36
 */
import { Column, Entity, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/entity/abstract-entity';
import { IsEmail, IsOptional } from 'class-validator';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  username: string;
  @Column()
  @Exclude()
  password: string;

  @Column({ default: null })
  @IsOptional()
  @IsEmail()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attemp: string): Promise<boolean> {
    return bcrypt.compare(attemp, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
