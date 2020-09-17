/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-08 17:57:56
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-08 18:38:20
 */
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CommentCreateDto {
  @IsString()
  comments: string;
  @IsUUID()
  gameId: string;
  @IsUUID()
  @IsOptional()
  userId?: string;
}
