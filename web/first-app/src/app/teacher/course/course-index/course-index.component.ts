import {Component, OnInit} from '@angular/core';
import {Page} from '../../../entity/page';
import {Course} from '../../../entity/course';
import {CourseService} from '../../../service/course.service';
import {Confirm, Notify} from 'notiflix';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-course-index',
  templateUrl: './course-index.component.html',
  styleUrls: ['./course-index.component.css']
})
export class CourseIndexComponent implements OnInit {

  // 初始化查询条件
  course = {name: '', lesson: ''};

  page = 0;
  size = 5;

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lesson: new FormControl(null, Validators.required),
  });

  pageData = new Page<Course>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.loadByPage(0, this.course);
  }

  loadByPage(page: number = 0, course: {name: string; lesson: string}): void {
    console.log('loadByPage', page);
    console.log('333');
    console.log('loadByPage', course);
    this.courseService.page({page, size: this.size}, course)
      .subscribe(pageData => {
        console.log('请求成功---', pageData);
        this.page = page;
        this.pageData = pageData;
      });
  }

  onPage($event: number): void {
    console.log('onPage is called', $event);
    this.loadByPage($event, this.course);
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

  onSubmit(): void {
    console.log('查询');
    const course = this.formGroup.value as {
      name: string,
      lesson: string,
    };
    console.log('111');
    console.log(course);
    console.log('222');
    this.loadByPage(0, course);
  }

}
