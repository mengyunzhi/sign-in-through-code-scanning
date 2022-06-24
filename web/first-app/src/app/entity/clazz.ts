import {BaseEntity} from './base-entity';

export interface Clazz extends BaseEntity {
  name: string;
  entranceData: number;
  length: number;
}
