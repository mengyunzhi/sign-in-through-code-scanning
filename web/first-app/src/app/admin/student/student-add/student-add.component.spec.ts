import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StudentAddComponent} from './student-add.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentAddModule} from './student-add.module';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';

describe('admin -> student -> StudentAddComponent', () => {
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StudentAddModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MockApiTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
