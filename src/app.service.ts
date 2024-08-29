import { Inject, Injectable } from '@nestjs/common';
import { FyleRepository } from './database/repositorys/Fyle';
import { Fyle } from './database/entitys/Fyle';

@Injectable()
export class AppService {
  @Inject() private fyleRepository: FyleRepository;

  getHello(): string {
    return 'Hello World!';
  }

  async transfer(file: Fyle) {
    const _fyle = await this.fyleRepository._save(file);
    return _fyle;
  }

  async get(params: { [x: string]: any } = {}) {
    const _fyles = await this.fyleRepository._find(params);
    return _fyles;
  }

  async getOne(params: { [x: string]: any } = {}) {
    const _fyle = await this.fyleRepository._findOne(params);
    return _fyle;
  }
}
