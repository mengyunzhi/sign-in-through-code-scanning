import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import {HttpClientModule} from '@angular/common/http';

describe('ScheduleService', () => {
  let service: ScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
