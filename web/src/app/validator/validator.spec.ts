import {Validator} from './validator';
import {FormControl} from '@angular/forms';

describe('validator', () => {
  it('should create an instance', () => {
    expect(new Validator()).toBeTruthy();
  });

  it('isPhoneNumber', () => {
    const formControl = new FormControl(18500003168);
    expect(Validator.isPhoneNumber(formControl)).toBeNull();

    const formControl1 = new FormControl(123456);
    expect(Validator.isPhoneNumber(formControl1)).toEqual({
      isPhoneNumber: '手机号校验错误'
    });

    const formControl2 = new FormControl(123456789);
    console.log(Validator.isPhoneNumber(formControl2));
    expect(Validator.isPhoneNumber(formControl1)).toEqual({
      isPhoneNumber: '手机号校验错误'
    });
  });
});
