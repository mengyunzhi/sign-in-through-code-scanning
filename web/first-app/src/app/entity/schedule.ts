import {BaseEntity} from './base-entity';

export interface Schedule extends BaseEntity {
  teacher_id: number;
  term_id: number;
  course_id: number;
  test_course_name: string;
  test_term_name: string;
  test_clazz_name: string;
}
