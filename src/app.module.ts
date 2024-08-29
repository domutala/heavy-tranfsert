import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigDatabase } from './database';
import providers from './database/repositorys/provider';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(ConfigDatabase())],
  controllers: [AppController],
  providers: [...providers, AppService],
})
export class AppModule {}
