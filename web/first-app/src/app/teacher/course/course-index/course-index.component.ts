import { Component, OnInit } from '@angular/core';
import {Page} from '../../../entity/page';
import {Course} from '../../../entity/course';
import {CourseService} from '../../../service/course.service';
import {Confirm, Notify} from "notiflix";

@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.css']
})
export class CourseIndexComponent implements OnInit {
  page = 0;
  size = 5;

  pageData = new Page<Course>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadByPage();
  }

  loadByPage(page: number = 0): void {
    console.log('loadByPage', page);
    this.courseService.page({page, size: this.size})
      .subscribe(pageData => {
        console.log('请求成功---', pageData);
        this.page = page;
        this.pageData = pageData;
      });
  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event);
  }

  onDelete(id: number): void {
    console.log('删除课程');
    Confirm.show(
      '请确认',
      '该操作不可逆',
      '确认',
      '取消',
      () => {
        this.courseService.delete(id)
          .subscribe(success => {
            console.log('删除成功', success);
            this.ngOnInit();
            Notify.success('删除成功', {timeout: 800});
          }, error => {
            console.log('删除失败', error);
            Notify.failure('删除失败', {timeout: 800});
          });
      },
    );
  }
}
