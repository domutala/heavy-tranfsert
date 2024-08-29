import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/transfer')
  async transfer(@Body() body: any) {
    return await this.appService.transfer(body.file);
  }

  @Get('/download')
  async download(@Res() res: Response, @Query('id') id: string) {
    const fyle = await this.appService.getOne({ id });
    if (!fyle) res.status(404).send();

    const buffer = Buffer.from(
      fyle.data.replace(/.*(base64,)/gm, ''),
      'base64',
    );
    const mimeType = fyle.type;

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${fyle.name}"`,
    });

    res.send(buffer);
  }
}
