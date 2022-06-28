import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {Clazz} from '../../../entity/clazz';
import {HttpClient} from '@angular/common/http';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 * 班级选择组件
 */
@Component({
  selector: 'app-clazz-select',
  templateUrl: './clazz-select.component.html',
  styleUrls: ['./clazz-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, multi: true,
      useExisting: forwardRef(() => {
        console.log('useExisting->forwardRef中的回调方法被调用一次');
        return ClazzSelectComponent;
      })
    }
  ]
})
export class ClazzSelectComponent implements OnInit, ControlValueAccessor {

  /**
   * 所有班级
   */
  clazzes = new Array<Clazz>();
  clazzId = new FormControl();

  @Input()
  set id(id: number) {
    // 使用接受到的id设置clazzId
    this.clazzId.setValue(id);
  }

  @Output()
  beChange = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    console.log('班级选择组件初始化');
    // 获取所有班级
    this.clazzId.valueChanges
      .subscribe((data: number) => this.beChange.emit(data));
    this.httpClient.get<Array<Clazz>>('clazz')
      .subscribe(clazzes => {
        this.clazzes = clazzes;
        console.log('班级选择组件接收到数据');
      });
  }

  /**
   * 子组件需要向父组件弹值时，直接调参数中的fn方法
   * 相当于@Ouput()
   * @param fn 此类型取决于当前组件的弹出值类型，当前弹出为clazzId number
   */
  registerOnChange(fn: (data: number) => void): void {
    console.log(`registerOnChange is called`);
    this.clazzId.valueChanges
      .subscribe(data => fn(data));
  }

  registerOnTouched(fn: any): void {
    console.warn('registerOnTouched not implemented');
  }

  /**
   * 将FormControl中的值通过此方法写入
   * FormControl的值每变换一次，该方法被重新执行一次
   * 相当于@Input set XXX
   * @param obj 此类型取决于当前组件的接收类型，当前接收为clazzId number
   */
  writeValue(obj: number): void {
    console.log('writeValue is called');
    this.clazzId.setValue(obj);
  }
}
