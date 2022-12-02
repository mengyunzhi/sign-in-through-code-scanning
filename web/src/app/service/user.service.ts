import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../entity/user';
import {Student} from '../entity/student';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static ROLE_ADMIN = 0;
  static ROLE_TEACHER = 1;
  static ROLE_STUDENT = 2;

  constructor(private httpClient: HttpClient) {
  }


  login(phone: string, password: string): Observable<User>{
    const httpParams = new HttpParams()
      .append('number', phone)
      .append('password', password);
    return this.httpClient.get<User>('/user/login', {params: httpParams});
  }

  getCurrentLoginUser(userNumber: string): Observable<User> {
    const httpParams = new HttpParams()
      .append('userNumber', userNumber);
    return this.httpClient.get<User>('/user/getCurrentLoginUser', {params: httpParams});
  }

  studentRegister(data: {sno: string, password: string, number: string}): Observable<Student> {
    const httpParams = new HttpParams()
      .append('sno', data.sno)
      .append('password', data.password)
      .append('number', data.number);
    return this.httpClient.get<Student>('/user/studentRegister', {params: httpParams});
  }

  userUpdate(data: { number: any; password: any; role: any; sex: any; name: any; id: number | undefined }): Observable<User> {
    return this.httpClient.post<User>('/user/userUpdate', data);
  }

  updateDefaultPassword(newIndexPassWord: any): Observable<boolean> {
    console.log('service', newIndexPassWord);
    return this.httpClient.post<boolean>('/user/updateDefaultPassword', newIndexPassWord);
  }

  getDefaultPassword(): Observable<any> {
    return this.httpClient.get('/user/getDefaultPassword', {responseType: 'text'});
  }

}
