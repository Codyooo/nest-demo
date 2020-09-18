/**
 * @file: description
 * @author: hufan
 * @Date: 2020-08-31 11:57:19
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-18 11:36:11
 */
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

async function bootstrap() {
  const cert = fs.readFileSync(
    join(`${__dirname}`, '..', 'cert', '1_doubleq.icu_bundle.crt'),
  );
  const key = fs.readFileSync(
    join(`${__dirname}`, '..', 'cert', '2_doubleq.icu.key'),
  );

  const httpsOptions = {
    key,
    cert,
  };

  const server = express();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  app.setGlobalPrefix('api');
  app.enableCors({});
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const { httpAdapter } = app.get(HttpAdapterHost);

  //exception 格式化
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  //response 格式化
  app.useGlobalInterceptors(new ResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('API文档')
    .addBearerAuth()
    .setDescription('测试在NestJS中集成Swagger')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  // fs.writeFileSync(join(__dirname, '..', 'public'), document);
  app.use('/api-docs', (req, res) => res.send(document));
  SwaggerModule.setup('api', app, document);

  await app.init();

  https.createServer(httpsOptions, server).listen(443);
  await app.listen(process.env.PORT || 4000);

  // await app.listen(process.env.PORT || 4000);
}
bootstrap();
