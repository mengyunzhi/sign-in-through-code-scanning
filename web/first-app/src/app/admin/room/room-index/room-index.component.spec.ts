import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomIndexComponent } from './room-index.component';

describe('RoomIndexComponent', () => {
  let component: RoomIndexComponent;
  let fixture: ComponentFixture<RoomIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomIndexComponent ]
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
