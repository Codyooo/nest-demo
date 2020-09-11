/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-10 17:24:37
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 11:59:49
 */
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // imports: [LoggerModule, MulterModule.register({ dest: './files' })],
  imports: [LoggerModule],
  controllers: [UploadController],
})
export class UploadModule {}
