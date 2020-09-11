/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-07 17:40:06
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 10:57:13
 */
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UsePipes,
  Logger,
  Delete,
} from '@nestjs/common';
import { GameService } from './game.service';
import { GameCreateDTO } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('GameController')
@ApiBearerAuth()
@Controller('game')
export class GameController {
  private readonly logger = new Logger(GameController.name);
  constructor(private gameService: GameService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body(ValidationPipe)
    payload: GameCreateDTO,
  ) {
    return await this.gameService.gameCreate(payload);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.gameService.findAll();
  }

  @Get('mygame')
  @UseGuards(JwtAuthGuard)
  async findMyGames(
    @User()
    user,
  ) {
    return await this.gameService.findMine(user.username);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return await this.gameService.findOne(id);
  }

  @Post('/:id/add')
  @UseGuards(JwtAuthGuard)
  async addToMygame(
    @User()
    user: UserEntity,
    @Param('id')
    gameId: string,
  ) {
    return await this.gameService.addToMyGames(gameId, user.username);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteFromMygame(
    @User()
    user: UserEntity,
    @Param('id')
    gameId: string,
  ) {
    return await this.gameService.deleteFromMygame(gameId, user.username);
  }
}
