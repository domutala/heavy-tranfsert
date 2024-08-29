import { Column, Entity } from 'typeorm';
import { Base } from './Base';

@Entity({ name: 'fyle' })
export class Fyle extends Base {
  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  size: string;

  @Column({ type: 'text', nullable: true })
  data: string;
}
