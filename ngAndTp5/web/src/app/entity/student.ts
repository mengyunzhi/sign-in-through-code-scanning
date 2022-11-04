import {User} from './user';
import {Clazz} from './clazz';

export interface Student extends User {
  user: User;
  clazz: Clazz;
  sno: string;
  state: number;
}
