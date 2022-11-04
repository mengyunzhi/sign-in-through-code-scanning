import {BaseEntity} from './base-entity';

export interface User extends BaseEntity {
  number: string;
  password: string;
  role: number;
  name: string;
  sex: number;
}
