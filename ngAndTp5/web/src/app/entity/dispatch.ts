import {BaseEntity} from './base-entity';
import {Schedule} from './schedule';

export interface Dispatch extends BaseEntity {
  schedule: Schedule;
  week: number;
  day: number;
  lesson: number;
  start_time: string;
  end_time: string;
  schedule_id: never;
}
