/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-14 16:08:13
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-15 11:48:40
 */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  Inject,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { AppResponse } from 'src/const/types';
import Chalk from 'chalk';
// import { Logger } from 'winston';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, AppResponse<T>> {
  private logger = new Logger(ResponseInterceptor.name);

  constructor() // @Inject('winston')
  // private readonly logger: Logger,
  {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AppResponse<T>> {
    const req = context.getArgByIndex(1).req;

    return next.handle().pipe(
      map(data => {
        const logFormat = `
        ${Chalk.cyan(
          `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`,
        )}
        ${Chalk.red(`Route`)}:  ${req.originalUrl}
        ${Chalk.blue(`Method`)}: ${req.method}
        ${Chalk.gray(`IP`)}: ${req.ip}
        ${Chalk.yellow(`User`)}:\n ${JSON.stringify(req.user, null, 4)}
        ${Chalk.magenta(`Response`)}:\n ${JSON.stringify(data, null, 4)}
        ${Chalk.cyan(
          `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`,
        )}
        `;

        this.logger.log(logFormat);

        return {
          code: 0,
          message: 'ok',
          data,
        };
      }),
      catchError(e => {
        this.logger.error(e);
        throw new Error(e);
      }),
    );
  }
}
