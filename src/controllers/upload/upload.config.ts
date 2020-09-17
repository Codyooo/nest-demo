/**
 * @file: description
 * @author: hufan
 * @Date: 2020-09-11 11:59:57
 * @LastEditors: hufan
 * @LastEditTime: 2020-09-11 16:46:58
 */
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { v4 as uuid } from 'uuid';
import { diskStorage, FileFilterCallback, Multer } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Request } from 'express';

export interface FileDto {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const editFileName = (req, file: FileDto, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const multerOption: MulterOptions = {
  limits: {},
  dest: './public/asset',
  fileFilter: imageFileFilter,
  storage: diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, `./public/asset`);
    },
    filename: (req: Request, file: Express.Multer.File, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};
