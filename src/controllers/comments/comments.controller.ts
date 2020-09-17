/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-08 10:52:33
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 11:42:01
 */
import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentCreateDto } from './dto';
import { User } from 'src/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('CommentsController')
@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOne(
    @Body(ValidationPipe)
    payload: CommentCreateDto,
    @User()
    user,
  ) {
    return await this.commentService.createOne({ ...payload, userId: user.id });
  }
}
