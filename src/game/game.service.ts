/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-07 17:40:15
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-10 16:38:28
 */
import {
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { Repository, Entity } from 'typeorm';
import { GameEntity } from './game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GameCreateDTO } from './dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class GameService {
  private logger = new Logger(GameService.name);

  constructor(
    @InjectRepository(GameEntity)
    private gameRepo: Repository<GameEntity>,

    private userService: UserService,
  ) {}

  async gameCreate(payload: GameCreateDTO): Promise<GameEntity> {
    const game = await this.gameRepo.create(payload);
    await game.save();
    return game;
  }

  async findOne(id: string) {
    const game = await this.gameRepo.findOne(id);
    if (!game) throw new NotFoundException('未找到相关游戏');
    return game;
  }

  async findAll() {
    const game = await this.gameRepo.find();
    return game;
  }

  async addToMyGames(gameId: string, username: string): Promise<void> {
    const game = await this.findOne(gameId);
    const user = await this.userService.findOne({
      relations: ['myGames'],
      where: { username },
    });
    if (user.myGames.some(g => g.id === game.id))
      throw new ConflictException('不能重复添加');
    user.myGames.push(game);
    await user.save();
  }

  async deleteFromMygame(gameId: string, username: string): Promise<any> {
    const game = await this.findOne(gameId);
    const user = await this.userService.findOne({
      relations: ['myGames'],
      where: { username },
    });

    if (!user.myGames.some(g => g.id === game.id))
      throw new ConflictException('error user do not own this game');

    user.myGames = user.myGames.filter(g => g.id !== gameId);
    await user.save();
    return { message: 'success' };
  }

  async gamefind(filter: any) {
    const games = await this.gameRepo.find();
    return games;
  }

  async findMine(username: string) {
    const user = await this.userService.findOne({
      where: { username },
      relations: ['myGames'],
    });
    if (!user) throw new NotFoundException('user not found');
    return user.myGames;
  }
}
