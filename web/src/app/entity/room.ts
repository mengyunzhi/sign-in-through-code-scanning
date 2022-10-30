import {BaseEntity} from './base-entity';

export interface Room extends BaseEntity {
  name: string;
  capacity: number;
}
