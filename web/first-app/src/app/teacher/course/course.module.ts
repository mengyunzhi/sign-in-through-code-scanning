import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseRoutingModule} from './course-routing.module';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import {CourseIndexComponent} from './course-index/course-index.component';
import {PageModule} from '../../page/page.module';



@NgModule({
  declarations: [CourseAddComponent, CourseEditComponent, CourseIndexComponent],
    imports: [
        CommonModule,
        CourseRoutingModule,
        PageModule,
    ],
})
export class CourseModule { }
