import {BaseEntity} from './base-entity';

export interface Clazz extends BaseEntity {
  name: string;
  entrance_date: number;
  length: number;
}
