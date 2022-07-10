import {BaseEntity} from './base-entity';
import {Course} from './course';

export interface Schedule extends BaseEntity {
  name: string;
  course: Course;
  lesson: number;
}
