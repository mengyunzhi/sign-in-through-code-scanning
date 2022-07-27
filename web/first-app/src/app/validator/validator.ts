import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * 验证器
 */
export class Validator {
  // 手机号正确返回null；手机号错误返回提示信息
  static isPhoneNumber(control: AbstractControl): ValidationErrors | null {
    let phone = control.value;
    if (phone) {
      if (Number.isInteger(phone)) {
        phone = phone.toString();
      }
      if (phone.length === 11) {
        if (checkPhone(phone)) {
          return null;
        }
      }
    }
    return {isPhoneNumber: '手机号校验错误'};
  }
}

/**
 * 手机号验证
 */
function checkPhone(val: string) {
  const myReg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
  return myReg.test(val);
}
