import {Observable, of} from 'rxjs';
import {Student} from '../entity/student';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static ROLE_ADMIN = 0;
  static ROLE_TEACHER = 1;
  static ROLE_STUDENT = 2;

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUser(): void {}
}
