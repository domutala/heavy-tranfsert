import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/transfert')
  transfert(@Body() data: any) {
    const id = uuidv4();
    writeFileSync(
      join(process.cwd(), '_FILES_', `${id}.json`),
      JSON.stringify(data),
    );

    return data;
  }
}
