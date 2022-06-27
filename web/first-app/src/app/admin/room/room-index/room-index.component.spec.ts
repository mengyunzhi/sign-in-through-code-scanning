import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomIndexComponent } from './room-index.component';
import {MockApiTestingModule} from '../../../mock-api/mock-api-testing.module';

describe('RoomIndexComponent', () => {
  let component: RoomIndexComponent;
  let fixture: ComponentFixture<RoomIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomIndexComponent ],
      imports: [
        MockApiTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
