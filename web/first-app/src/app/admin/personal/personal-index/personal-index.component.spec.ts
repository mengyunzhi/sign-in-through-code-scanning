import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIndexComponent } from './personal-index.component';
import {PipeModule} from '../../../pipe/pipe.module';
import {HttpClientModule} from '@angular/common/http';

describe('admin -> personal -> PersonalIndexComponent', () => {
  let component: PersonalIndexComponent;
  let fixture: ComponentFixture<PersonalIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalIndexComponent ],
      imports: [
        PipeModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.autoDetectChanges();
  });
});
