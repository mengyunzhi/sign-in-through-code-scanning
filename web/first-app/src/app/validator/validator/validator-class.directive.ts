import {Directive, ElementRef, OnDestroy} from '@angular/core';
import {NgControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[appValidatorClass]'
})
export class ValidatorClassDirective implements OnDestroy {

  subscriptions = [] as Subscription[];

  constructor(private elementRef: ElementRef, private formControl: NgControl) {
    // 等待FormControl初始化完成后再进行订阅
    setTimeout(() => {
      this.setClass(formControl);
      if (formControl.statusChanges) {
        this.subscriptions.push(formControl.statusChanges.subscribe(() => {
          this.setClass(formControl);
        }));
      } else {
        console.warn(`未获取到FormControl${formControl.name}上的valueChanges属性`);
      }
    });
  }

  /**
   * 指令销毁时取消订阅
   * 防止溢出
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  /**
   * 设置宿主元素样式
   * @param formControl 表单控制器
   */
  setClass(formControl: NgControl) {
    const htmlElement = this.elementRef.nativeElement as HTMLElement;
    const classes = htmlElement.className.split(' ')
      .filter(value => value !== 'is-invalid' && value !== 'is-valid' && value !== 'is-required');
    if (formControl.valid) {
      classes.push('is-valid');
    } else if (formControl.dirty || formControl.touched) {
      classes.push('is-invalid');
    } else {
      classes.push('is-required');
    }
    htmlElement.className = classes.join(' ');
  }
}
