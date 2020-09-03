/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-01 10:42:38
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-01 10:43:26
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
