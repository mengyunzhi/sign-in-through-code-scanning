import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Clazz} from '../../../entity/clazz';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';

/**
 * 班级选择组件
 */
@Component({
  selector: 'app-clazz-select',
  templateUrl: './clazz-select.component.html',
  styleUrls: ['./clazz-select.component.css']
})
export class ClazzSelectComponent implements OnInit {

  /**
   * 所有班级
   */
  clazzes = new Array<Clazz>();
  clazzId = new FormControl();

  @Output()
  beChange = new EventEmitter<number>();

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // 获取所有班级
    this.clazzId.valueChanges
      .subscribe((data: number) => this.beChange.emit(data));
    this.httpClient.get<Array<Clazz>>('clazz')
      .subscribe(clazzes => this.clazzes = clazzes);
  }
}
