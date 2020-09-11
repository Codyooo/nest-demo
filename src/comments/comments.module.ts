/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-08 10:52:15
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-08 18:20:38
 */
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { UserModule } from 'src/user/user.module';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), UserModule, GameModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
