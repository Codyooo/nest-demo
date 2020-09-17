/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 11:57:19
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-15 16:05:58
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { GameModule } from './controllers/game/game.module';
import { CommentsModule } from './controllers/comments/comments.module';
import { UploadModule } from './controllers/upload/upload.module';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import { CourseModule } from './controllers/course/course.module';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    }),
    UserModule,
    AuthModule,
    GameModule,
    CommentsModule,
    UploadModule,
    LoggerModule,
    WinstonModule.forRoot({
      transports: new winston.transports.Console(),
    }),
    CourseModule,
  ],
  controllers: [],
})
export class AppModule {}
