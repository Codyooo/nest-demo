/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-10 17:32:08
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-10 17:33:37
 */
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
