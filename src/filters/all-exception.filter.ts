/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-14 16:34:22
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-15 11:11:25
 */
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppResponse } from 'src/const/types';
import { Request } from 'express';

@Catch()
export class AllExceptionFilter<T> extends BaseExceptionFilter {
  private logger = new Logger(AllExceptionFilter.name);
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.debug(exception);

    const {
      query,
      params,
      body,
      method,
      url,
      route,
      authInfo,
      ip,
      user,
      cookies,
      hostname,
    } = request;
    this.logger.debug({
      data: {
        query,
        params,
        body,
        method,
        url,
        authInfo,
        ip,
        user: user,
        hostname,
        cookies,
        message: (exception as any).message,
      },
    });

    const res: AppResponse<any> = {
      code: status,
      message: (exception as any)?.message,
    };

    response.status(status).json(res);
  }
}
