/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-07 17:40:06
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-15 10:50:59
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
import { User } from 'src/decorators/user.decorator';
import { UserEntity, Roles } from 'src/controllers/user/user.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiResponseProperty,
  ApiProperty,
} from '@nestjs/swagger';
import { RbacGuard } from 'src/guards/rbac.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GameEntity } from './game.entity';
import { AppResponse } from 'src/const/types';

@ApiTags('GameController')
@ApiBearerAuth()
@Controller('game')
export class GameController {
  private readonly logger = new Logger(GameController.name);
  constructor(private gameService: GameService) {}

  @Post()
  @UseGuards(new RbacGuard(Roles.ADMIN))
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '新增游戏' })
  async create(
    @Body(ValidationPipe)
    payload: GameCreateDTO,
  ) {
    return await this.gameService.gameCreate(payload);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取全部游戏' })
  // @ApiResponse({
  //   type:
  // })
  // @ApiResponseProperty({})
  async findAll() {
    return await this.gameService.findAll();
  }

  @Get('mygame')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取我的游戏' })
  async findMyGames(
    @User()
    user,
  ) {
    return await this.gameService.findMine(user.username);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定游戏' })
  async findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return await this.gameService.findOne(id);
  }

  @Post('/:id/add')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '加入我的游戏' })
  async addToMygame(
    @User()
    user: UserEntity,
    @Param('id')
    gameId: string,
  ) {
    return await this.gameService.addToMyGames(gameId, user.username);
  }

  @Delete('/:id')
  @ApiOperation({ summary: '删除游戏' })
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
