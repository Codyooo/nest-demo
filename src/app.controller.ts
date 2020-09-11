/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 11:57:19
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 10:17:55
 */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
