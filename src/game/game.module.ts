/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-07 17:39:54
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-10 18:25:11
 */
import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './game.entity';
import { UserModule } from 'src/user/user.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity]), UserModule, LoggerModule],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
