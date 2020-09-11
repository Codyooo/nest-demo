/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-08 10:52:24
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-09 11:47:06
 */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { CommentCreateDto } from './dto';
import { UserService } from 'src/user/user.service';
import { GameService } from 'src/game/game.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepo: Repository<CommentEntity>,
    private gameService: GameService,
    private userService: UserService,
  ) {}

  async createOne(payload: CommentCreateDto) {
    const { comments, gameId, userId } = payload;
    const game = await this.gameService.findOne(gameId);
    const user = await this.userService.getCurrentUser(userId);
    if (!game || !user)
      throw new InternalServerErrorException('用户或游戏不存在');
    try {
      const comment = await this.commentRepo.create({ comments, game, user });
      await comment.save();
      return comment;
    } catch (error) {
      return {
        code: -1,
        message: error.message,
      };
    }
  }

  async findAll(): Promise<CommentEntity[]> {
    return this.commentRepo.find();
  }

  async findOne(id: string): Promise<CommentEntity> {
    return this.commentRepo.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.commentRepo.delete(id);
  }
}
