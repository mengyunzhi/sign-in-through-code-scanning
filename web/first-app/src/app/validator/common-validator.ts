import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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

  clazzNameUnique(): (control: AbstractControl) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const name = control.value;
      return this.httpClient.get(this.url + '/clazz/clazzNameUnique/name/' + name)
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

}
