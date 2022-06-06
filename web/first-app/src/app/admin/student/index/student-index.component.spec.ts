import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentIndexComponent} from './student-index.component';
import {FormsModule} from '@angular/forms';

describe('StudentIndexComponent', () => {
  let component: StudentIndexComponent;
  let fixture: ComponentFixture<StudentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentIndexComponent],
      imports: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
