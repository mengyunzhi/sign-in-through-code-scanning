import {BaseEntity} from './base-entity';
import {Teacher} from './teacher';
import {Term} from './term';
import {Course} from './course';
import {Clazz} from "./clazz";

export interface Schedule extends BaseEntity {
  teacher: Teacher;
  term: Term;
  course: Course;
  clazzes: Clazz[];
}
