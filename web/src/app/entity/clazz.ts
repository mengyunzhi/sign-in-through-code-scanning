import {BaseEntity} from './base-entity';

export interface Clazz extends BaseEntity {
  name: string;
  entrance_date: string;
  number_of_students: number;
  length: number;
}
