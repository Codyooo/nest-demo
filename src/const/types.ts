import { Entity } from 'typeorm';

/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-14 16:54:39
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 18:52:31
 */
@Entity('response')
export class AppResponse<T> {
  code: number;
  message: string;
  data?: T;
}
