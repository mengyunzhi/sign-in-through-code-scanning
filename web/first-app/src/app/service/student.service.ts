import {Observable, of} from 'rxjs';
import {Student} from '../entity/student';
import {Page} from '../entity/page';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) {
  }

  page(page: number, size: number): Observable<Page<Student>> {
    const httpParams = new HttpParams().append('page', page.toString())
      .append('size', size.toString());
    return this.httpClient.get<Page<Student>>('/student/page', {params: httpParams});
  }
}
