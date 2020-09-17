/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:35:03
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 14:19:01
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getUserProfile(username: string) {
    const user = await this.userRepo.findOne({ username });
    if (!user) throw new NotFoundException('User not found');
    return user.toJSON();
  }

  async getCurrentUser(username: string) {
    const user = await this.userRepo.findOne({ username });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async findOne(option: FindOneOptions<UserEntity>) {
    return await this.userRepo.findOne(option);
  }

  async findAll() {
    const user = await this.userRepo.find({});
    return user;
  }
}
