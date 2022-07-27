import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {isObject} from 'rxjs/internal-compatibility';
import {ApiInterceptor} from '../interceptor/api.interceptor';
import {isNull} from '@angular/compiler/src/output/output_ast';

export class CommonValidator {
  static name_min_length = 2;
  static name_max_length = 25;
  url = ApiInterceptor.api;

  constructor(private httpClient: HttpClient) {
  }

  static integer(control: AbstractControl): ValidationErrors  | null {
    const num = control.value;
    if ((num % 1) !== 0) {
      return {integer: '非整数类型'};
    } else {
      return null;
    }
  }

  static nameMinLength(control: AbstractControl): ValidationErrors | null {
    const name = control.value;
    if (name.length >= CommonValidator.name_min_length) {
      return null;
    } else {
      return {nameMinLength: '名称长度最小应为' + CommonValidator.name_min_length, actualNameLength: '实际长度为' + name.length};
    }
  }

  static nameMaxLength(control: AbstractControl): ValidationErrors | null {
    const name = control.value;
    if (name.length <= CommonValidator.name_max_length) {
      return null;
    } else {
      return {nameMinLength: '名称长度最大应为' + CommonValidator.name_max_length, actualNameLength: '实际长度为' + name.length};
    }
  }

  static sex(control: AbstractControl): ValidationErrors | null {
    const sex = +control.value;
    if (sex === 0 || sex === 1) {
      return null;
    } else {
      return {sex: '性别字段所代值应为0或者1'};
    }
  }

  static sno(control: AbstractControl): ValidationErrors | null {
    console.log(control.value);
    const sno = control.value.toString();
    let stu = false;
    for (const s of sno) {
      if (!(+s >= 0 && +s <= 9)) {
        stu = true;
        break;
      }
    }
    if (stu) {
      return {sno: '学号应为数字串'};
    } else {
      return null;
    }
  }

  clazzNameUnique(clazz_id = 0): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value;
      const httpParams = new HttpParams()
        .append('name', name)
        .append('clazz_id', clazz_id.toString());
      return this.httpClient.get(this.url + '/clazz/clazzNameUnique', {params: httpParams})
        .pipe(map(data => {
          console.log('clazNameUnique', data);
          if (data) {
            return {clazzNameUnique: data};
          } else {
            return null;
          }
        }));
    };
  }

  numberUnique(id = 0, url = this.url): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const num = control.value;
      const httpParams = new HttpParams()
        .append('number', num)
        .append('id', id.toString());
      return this.httpClient.get(url + '/user/numberUnique', {params: httpParams})
        .pipe(map(data => {
          console.log('numberUnique', data);
          if (data) {
            return {numberUnique: data};
          } else {
            return null;
          }
        }));
    };
  }

  numberUniqueForStudentRegister(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return this.numberUnique(0, '');
  }

  programNameUnique(progarm_id = 0): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control) => {
      const name = control.value;
      const httpParams = new HttpParams()
        .append('name', name)
        .append('progarm_id', progarm_id.toString());
      return this.httpClient.get('/program/programNameUnique', {params: httpParams})
        .pipe(map(data => {
          console.log('programNameUnique', data);
          if (data) {
            return {programNameUnique: data};
          } else {
            return null;
          }
        }));
    };
  }

  roomNameUnique(room_id = 0): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control) => {
      const name = control.value;
      const httpParams = new HttpParams()
        .append('name', name)
        .append('room_id', room_id.toString());
      return this.httpClient.get(this.url + '/room/roomNameUnique', {params: httpParams})
        .pipe(map(data => {
          console.log('roomNameUnique', data);
          if (data) {
            return {roomNameUnique: data};
          } else {
            return null;
          }
        }));
    };
  }

  snoUnique(user_id = 0): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control) => {
      const sno = control.value;
      const httpParams = new HttpParams()
        .append('sno', sno)
        .append('user_id', user_id.toString());
      return this.httpClient.get(this.url + '/student/snoUnique', {params: httpParams})
        .pipe(map(data => {
          console.log('snoUnique', data);
          if (data) {
            return {snoUnique: data};
          } else {
            return null;
          }
        }));
    };
  }

  snoExist(user_id = 0): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control) => {
      const sno = control.value;
      const httpParams = new HttpParams()
        .append('sno', sno)
        .append('user_id', user_id.toString());
      return this.httpClient.get('/student/snoUnique', {params: httpParams})
        .pipe(map(data => {
          console.log('snoExist', data);
          if (data) {
            return null;
          } else {
            return {snoExist: '学号不存在'};
          }
        }));
    };
  }

  termNameUnique(term_id = 0): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control) => {
      const name = control.value;
      const httpParams = new HttpParams()
        .append('name', name)
        .append('term_id', term_id.toString());
      return this.httpClient.get(this.url + '/term/termNameUnique', {params: httpParams})
        .pipe(map(data => {
          console.log('termNameUnique', data);
          if (data) {
            return {termNameUnique: data};
          } else {
            return null;
          }
        }));
    };
  }

}
