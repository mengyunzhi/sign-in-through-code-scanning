import {BaseEntity} from './base-entity';
import {Teacher} from './teacher';
import {Student} from './student';

export interface User extends BaseEntity {
  number: string;
  password: string;
  role: number;
  name: string;
  sex: number;
  teacher: Teacher;
  student: Student;
}
