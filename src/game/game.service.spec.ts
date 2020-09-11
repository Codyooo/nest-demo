/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-10 11:09:08
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-10 11:19:10
 */
import { Test } from '@nestjs/testing';
import { GameService } from './game.service';
import { GameEntity } from './game.entity';

const mockGameRepo = () => ({
  getAllGame: jest.fn(),
});

describe('GameService', () => {
  let gameService;
  let gameRepo;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GameService,
        { provide: GameEntity, useFactory: mockGameRepo },
      ],
    }).compile();

    gameService = await module.get<GameService>(GameService);
    gameRepo = await module.get<GameEntity>(GameEntity);
  });

  describe('getAllGame', () => {
    it('get all game', () => {
      expect(gameRepo.getAllGame).not.toHaveBeenCalled();
    });
  });
});
