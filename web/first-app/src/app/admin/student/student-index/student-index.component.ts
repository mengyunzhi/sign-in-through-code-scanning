import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../../entity/page';
import {StudentService} from '../../../service/student.service';
import {CommonService} from '../../../service/common.service';
import {Student} from '../../../entity/student';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.css']
})
export class StudentIndexComponent implements OnInit {
  page = 0;
  size = 3;

  // 初始化一个有0条数据的分页
  // 此处的any类型为StudentService的T接口, 暂时没有好的处理方法
  pageDate = new Page<Student>({
    content: [],
    number: this.page,
    size: this.size,
    numberOfElements: 0
  });

  // 初始化查询条件
  param = {clazz: '', name: '', sno: ''};
  queryForm = new FormGroup({
    clazz: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    sno: new FormControl('', Validators.required),
  });

  constructor(private httpClient: HttpClient,
              private studentService: StudentService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.loadByPage(0, this.param);
  }

  onPage($event: number): void {
    const query = this.queryForm.value as {
      clazz: string,
      name: string,
      sno: string,
    };
    this.loadByPage($event, query);
  }

  /**
   * 获取页面数据
   * @param page pageDte
   */
  loadByPage(page: number = 0, param: {clazz: string, name: string, sno: string}): void {
    console.log('触发loadByPage方法');
    this.studentService.page({page, size: this.size}, param)
      .subscribe(pageDate => {
        // 请求数据之后设置当前页
        console.log('请求成功', pageDate);
        this.page = page;
        this.pageDate = pageDate;
      });
  }


  /**
   * 删除
   */
  onDelete(id: number): void {
    this.commonService.confirm(confirm => {
      if (confirm) {
        this.studentService.delete(id)
          .subscribe(() => {
            console.log('删除成功');
            this.commonService.success();
            this.ngOnInit();
          }, error => {
            console.log('删除失败', error);
            this.commonService.error();
          });
      }
    });
  }

  onSubmit(): void {
    const query = this.queryForm.value as {
      clazz: string,
      name: string,
      sno: string,
    };
    this.loadByPage(0, query);
  }
}
