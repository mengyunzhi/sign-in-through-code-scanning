import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEditComponent } from './schedule-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {ScheduleEditModule} from './schedule-edit.module';
import {Course} from '../../../entity/course';
import {Schedule} from '../../../entity/schedule';
import {Program} from '../../../entity/program';
import {Clazz} from '../../../entity/clazz';
import {Dispatch} from '../../../entity/dispatch';
import {Room} from '../../../entity/room';

describe('ScheduleEditComponent', () => {
  let component: ScheduleEditComponent;
  let fixture: ComponentFixture<ScheduleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleEditComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ScheduleEditModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    component.data = {
      schedule: {
        id: 1,
        course: {
          name: '测试文件班级1',
          lesson: 11
        } as Course,
      } as Schedule,
      programs: [
        {
          name: '测试文件项目1',
          lesson: 44
        } as Program,
      ] as Program[],
      clazzes: [
        {
          name: '测试文件班级1',
        } as Clazz
      ] as Clazz[],
      dispatches: [
        {
          week: 1,
          day: 2,
          lesson: 3
        } as Dispatch,
      ],
      rooms: [
        [
          {
            name: '测试文件教室1',
          } as Room,
        ]
      ]
    };
    expect(component).toBeTruthy();
    console.log(component.data);
  });
});
