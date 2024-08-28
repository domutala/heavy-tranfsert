import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';

interface IFyle {
  name: string;
  type: string;
  data: string;
  size: number;
}

interface ITransfer {
  file: IFyle;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/transfer')
  transfer(@Body() body: ITransfer) {
    const id = uuidv4();

    writeFileSync(
      join(process.cwd(), '..', '_FILES_', `${id}.json`),
      JSON.stringify(body),
    );

    return body;
  }

  @Get('/download')
  download(@Res() res: Response, @Query('id') id: string) {
    const transfer = JSON.parse(
      readFileSync(join(process.cwd(), '..', '_FILES_', `${id}.json`), 'utf-8'),
    ) as ITransfer;

    const file = transfer.file;
    const buffer = Buffer.from(
      file.data.replace(/.*(base64,)/gm, ''),
      'base64',
    );
    const mimeType = file.type;

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${file.name}"`,
    });

    res.send(buffer);
  }
}
