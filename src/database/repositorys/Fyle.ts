import { Fyle } from '../entitys/Fyle';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FyleRepository extends Repository<Fyle> {
  constructor(dataSource: DataSource) {
    super(Fyle, dataSource.createEntityManager());
  }

  async _save(params: Fyle) {
    const fyle = new Fyle();
    fyle.generateId();

    fyle.type = params.type;
    fyle.name = params.name;
    fyle.size = params.size;
    fyle.data = params.data;

    await fyle.save();
    return fyle;
  }

  async _findOne(params: { [x: string]: any }) {
    if (
      Object.values(params)
        .map((v) => v !== undefined)
        .includes(false)
    ) {
      return;
    }

    const fyles = await this._find(params);

    return fyles[0];
  }

  async _find(params: { [x: string]: any } = {}) {
    const queryBuilder = this.createQueryBuilder('fyle');

    if (params.id) queryBuilder.andWhere(`fyle.id = '${params.id}'`);

    const fyles = await queryBuilder.getMany();

    return fyles;
  }
}
