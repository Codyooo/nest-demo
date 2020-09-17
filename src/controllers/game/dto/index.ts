/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-08 16:59:34
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 10:33:28
 */
import { IsString, IsNumber, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GameCreateDTO {
  @IsString()
  @IsNotEmpty({ message: '游戏名不能为空' })
  @ApiProperty({ description: '游戏标题' })
  title: string;

  //   @Column()
  //   titleEng: string;

  @IsString()
  @IsNotEmpty({ message: '游戏大小不能为空' })
  @ApiProperty({ description: '游戏大小' })
  size: string;

  @IsString()
  @ApiProperty({ description: '游戏描述' })
  desc: string;

  @IsNumber()
  @ApiProperty({ description: '人数' })
  player: number;

  @IsBoolean()
  @ApiProperty({ description: '仅数字版' })
  digitalOnly: boolean;
}
