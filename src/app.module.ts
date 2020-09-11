/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 11:57:19
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 16:41:31
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { CommentsModule } from './comments/comments.module';
import { UploadModule } from './upload/upload.module';
import { LoggerModule } from './logger/logger.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'files'),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
