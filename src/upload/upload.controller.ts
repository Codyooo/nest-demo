/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-10 17:24:56
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 16:59:06
 */
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Request,
} from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoggerService } from 'src/logger/logger.service';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileDto, multerOption } from './upload.config';
import { join } from 'path';
import { Request as RQ } from 'express';

@ApiTags('UploadController')
@Controller('upload')
export class UploadController {
  constructor(private logger: LoggerService) {
    this.logger.setContext(UploadController.name);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerOption))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  upload(
    @UploadedFile()
    file: FileDto,
    @Request()
    req: RQ,
  ) {
    const response = {
      name: file.originalname,
      uid: file.filename,
      url: `${req.protocol}://${join(req.get('host'), 'asset', file.filename)}`,
    };
    return response;
  }
}
