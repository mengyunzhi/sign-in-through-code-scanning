import {BaseEntity} from './base-entity';
import {Course} from './course';

export interface Program extends BaseEntity {
  name: string;
  course: Course;
  lesson: number;
}
