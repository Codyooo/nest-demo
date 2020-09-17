/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-01 10:45:41
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 15:53:50
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/config/const';
import { LoggerService } from 'src/logger/logger.service';
import { Roles } from 'src/controllers/user/user.entity';

export interface JwtPayload {
  username: string;
  id: string;
  role: Roles;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService<EnvironmentVariables>,
    private logger: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
