/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:32:50
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-09 14:09:34
 */
import {
  Column,
  Entity,
  BeforeInsert,
  OneToMany,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { classToPlain, Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/entity/abstract-entity';
import { IsEmail, IsOptional } from 'class-validator';
import { CommentEntity } from 'src/comments/comments.entity';
import { GameEntity } from 'src/game/game.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  username: string;
  @Column()
  @Exclude()
  password: string;

  @Column({ default: null })
  @IsOptional()
  @IsEmail()
  email: string;

  @OneToMany(
    type => CommentEntity,
    comment => comment.user,
  )
  comments: CommentEntity[];

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(type => GameEntity)
  @JoinTable({ name: 'user_game' })
  myGames: GameEntity[];

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
