/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-08 11:08:01
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-10 14:25:58
 */
import { AbstractEntity } from 'src/entity/abstract-entity';
import { Column, ManyToOne, Entity, Unique } from 'typeorm';
import { UserEntity } from 'src/controllers/user/user.entity';
import { GameEntity } from 'src/controllers/game/game.entity';

@Entity('comment')
@Unique('user_comment', ['user', 'game'])
export class CommentEntity extends AbstractEntity {
  @Column()
  comments: string;

  @ManyToOne(
    () => UserEntity,
    user => user.comments,
    { onDelete: 'CASCADE' },
  )
  user: UserEntity;

  @ManyToOne(
    () => GameEntity,
    game => game.comments,
    { onDelete: 'CASCADE' },
  )
  game: GameEntity;
}
