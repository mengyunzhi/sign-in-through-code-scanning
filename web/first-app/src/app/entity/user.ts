import {BaseEntity} from './base-entity';

export interface User extends BaseEntity {
  number: string;
  password: string;
  role: string;
  name: string;
  sex: number;
}
