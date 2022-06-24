import {BaseEntity} from './base-entity';

export interface Term extends BaseEntity {
  name: string;
  state: number;
  start_time: number;
  end_time: number;
}
