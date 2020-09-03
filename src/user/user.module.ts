/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 14:34:41
 * @LastEditors: hufan
 * @LastEditTime: 2020-08-31 17:38:19
 */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ProfileController } from './profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController, ProfileController],
  providers: [UserService],
})
export class UserModule {}
