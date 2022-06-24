import {BaseEntity} from './base-entity';

export interface Student extends BaseEntity {
  // userId: number;  // todo User
  // klassId: number; // todo Klass
  sno: number;
  state: boolean;

  name: string;
  sex: boolean;
  clazzName: string;
}
