/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-14 10:40:01
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 15:19:03
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles, UserEntity } from 'src/controllers/user/user.entity';
import { JwtPayload } from 'src/controllers/auth/jwt.stradegy';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly role: Roles) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('req,req', req.user);
    const user = req.user as JwtPayload;
    if (!user) throw new NotFoundException('user not found');
    if (user.role > this.role) throw new ForbiddenException('无权操作');

    return true;
  }
}
