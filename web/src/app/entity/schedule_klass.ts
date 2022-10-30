import {BaseEntity} from './base-entity';
import {Clazz} from './clazz';
import {Schedule} from './schedule';

export interface ScheduleKlass extends BaseEntity {
  schedule: Schedule;
  clazz: Clazz;
}
