/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-07 17:40:38
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-10 17:23:07
 */
import { AbstractEntity } from 'src/entity/abstract-entity';
import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { CommentEntity } from 'src/controllers/comments/comments.entity';
import { IsOptional } from 'class-validator';

@Entity('game')
export class GameEntity extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  size: string;

  @Column()
  desc: string;

  @Column()
  player: number;

  @Column({ default: null })
  @IsOptional()
  cover: string;

  @Column({ default: false })
  digitalOnly: boolean;

  @OneToMany(
    type => CommentEntity,
    comment => comment.game,
  )
  comments: CommentEntity[];

  // @ManyToMany(
  //   type => UserEntity,
  //   user => user.myGames,
  // )
  // ownedBy: UserEntity[];

  //   @OneToMany()
  //   comments: any;

  //   @Column({ default: false })
  //   demo: boolean;

  //   @Column()
  //   preview: string;

  //   @Column()
  //   covers: string[];

  //   @Column()
  //   releaseDate: Date;

  //   @Column()
  //   currentPrice: number;

  //   @Column()
  //   historyLowestPrice: number;

  //   @OneToMany()
  //   tags: any;
}
