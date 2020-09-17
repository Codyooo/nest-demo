/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 15:21:47
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-14 15:19:46
 */
import {
  IsString,
  MinLength,
  IsEmail,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/controllers/user/user.entity';

export class LoginDTO {
  @IsString()
  @ApiProperty({ description: '用户名称', uniqueItems: true, example: 'cody' })
  username: string;
  @IsString()
  @MinLength(6)
  @ApiProperty({ description: '用户密码', minLength: 6, example: '123456' })
  password: string;
}

export class RegisterDTO extends LoginDTO {
  @IsString()
  @IsEmail()
  @ApiProperty({ default: null, description: '用户邮箱' })
  email: string;
}

export class UserRoleChangeDTO {
  @IsString()
  @ApiProperty({ default: null, description: '用户名' })
  username: string;
  @IsEnum(Roles)
  @ApiProperty({
    default: null,
    description: '角色',
    enum: ['ADMIN', 'OPERATOR'],
  })
  role: Roles;
}
