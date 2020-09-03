/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 11:57:19
 * @LastEditors: hufan
 * @LastEditTime: 2020-08-31 18:18:51
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.useGlobalPipes()

  const options = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('测试在NestJS中集成Swagger')
    .setVersion('1.0')
    .addTag('kwai')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
