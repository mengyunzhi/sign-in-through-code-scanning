import {User} from './user';

export interface Student extends User {
  user_id: number;
  clazz_id: number;
  sno: number;
  state: number;
}
