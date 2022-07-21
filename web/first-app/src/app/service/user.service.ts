import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static ROLE_ADMIN = 0;
  static ROLE_TEACHER = 1;
  static ROLE_STUDENT = 2;

  constructor(private httpClient: HttpClient) {
  }

  isLogin(moduleRole: number): Observable<boolean> {
    const httpParams = new HttpParams()
      .append('moduleRole', moduleRole.toString());
    return this.httpClient.get<boolean>('/user/isLogin', {params: httpParams});
  }

  login(phone: string, password: string): Observable<User>{
    const httpParams = new HttpParams()
      .append('number', phone)
      .append('password', password);
    return this.httpClient.get<User>('/user/login', {params: httpParams});
  }

  logout(): Observable<void> {
    return this.httpClient.get<void>('/user/logout');
  }

  getCurrentLoginUser(): Observable<User> {
    return this.httpClient.get<User>('/user/getCurrentLoginUser');
  }

  studentRegister(data: {sno: string, password: string, number: string}): Observable<boolean> {
    return this.httpClient.post<boolean>('/user/studentRegister', data);
  }

  userUpdate(id: number, data: {name: string, sex: number, number: string, role: number, password: string}): Observable<boolean> {
    return this.httpClient.post<boolean>('/user/userUpdate/id/' + id.toString(), data);
  }

}
