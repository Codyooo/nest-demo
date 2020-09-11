/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-10 15:46:08
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-10 15:46:12
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
