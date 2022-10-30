import {BaseEntity} from './base-entity';

export interface Course extends BaseEntity {
  name: string;
  lesson: number;
}
