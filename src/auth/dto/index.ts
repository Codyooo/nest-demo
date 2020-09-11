/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 15:21:47
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 10:38:14
 */
import { IsString, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsString()
  @ApiProperty({ description: '用户名称', uniqueItems: true, example: 'cody1' })
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
