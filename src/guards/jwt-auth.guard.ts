/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-01 10:54:43
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-01 10:54:50
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
